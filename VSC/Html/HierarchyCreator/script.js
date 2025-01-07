let currentEditingRole = null;
let isDraggingPopup = false;
let isDraggingRole = false;
let isDraggingContainer = false;
let offsetX, offsetY;
let startX, startY, startLeft, startTop;
let zoomLevel = 1; // Initialize zoom level
const zoomStep = 0.1; // Zoom step size
const minZoom = 0.1; // Minimum zoom level
const maxZoom = 3; // Maximum zoom level

// Function to start dragging the container
function startContainerDrag(event) {
    if (event.button !== 0 || isDraggingRole || isDraggingPopup) return; // Only left mouse button

    isDraggingContainer = true;
    startX = event.clientX;
    startY = event.clientY;

    const container = document.querySelector('.hierarchy-container');
    startLeft = parseFloat(container.style.left) || 0;
    startTop = parseFloat(container.style.top) || 0;

    function dragContainer(event) {
        if (!isDraggingContainer) return;

        const dx = (event.clientX - startX) / zoomLevel;
        const dy = (event.clientY - startY) / zoomLevel;

        const container = document.querySelector('.hierarchy-container');
        container.style.left = `${startLeft + dx}px`;
        container.style.top = `${startTop + dy}px`;
    }

    function stopContainerDrag() {
        isDraggingContainer = false;
        document.removeEventListener('mousemove', dragContainer);
        document.removeEventListener('mouseup', stopContainerDrag);
    }

    document.addEventListener('mousemove', dragContainer);
    document.addEventListener('mouseup', stopContainerDrag);
}

// Function to handle zooming with smooth transition
function zoomContainer(event) {
    event.preventDefault(); // Prevent default scroll behavior

    if (isDraggingRole || isDraggingPopup) return; // Do not zoom if dragging role or popup

    const container = document.querySelector('.hierarchy-container');
    const rect = container.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const delta = event.deltaY < 0 ? zoomStep : -zoomStep;
    zoomLevel = Math.min(maxZoom, Math.max(minZoom, zoomLevel + delta)); // Limit zoom level

    // Adjust the container's scale
    container.style.transition = 'transform 0.1s'; // Smooth transition
    container.style.transform = `scale(${zoomLevel})`;
    container.style.transformOrigin = '0 0'; // Zoom relative to top-left corner

    // Adjust the container's position to zoom into the mouse position
    const newLeft = parseFloat(container.style.left || 0) - (mouseX * delta);
    const newTop = parseFloat(container.style.top || 0) - (mouseY * delta);
    container.style.left = `${newLeft}px`;
    container.style.top = `${newTop}px`;

    // Ensure high-quality rendering
    container.style.willChange = 'transform';
}

// Add event listeners
document.addEventListener('mousedown', startContainerDrag);
document.addEventListener('wheel', zoomContainer);

// Function to teleport the container to the center
function teleportToCenter() {
    const container = document.querySelector('.hierarchy-container');
    container.style.left = '50%';
    container.style.top = '50%';
    container.style.transform = `translate(-50%, -50%) scale(${zoomLevel})`;
}

// Add event listener for the "Teleport to Center" button
document.getElementById('teleportButton').addEventListener('click', teleportToCenter);

// Update role dragging to account for zooming
function startDrag(event, role) {
    event.preventDefault(); // Prevent text selection on drag start

    const roleRect = role.getBoundingClientRect();
    const containerRect = document.querySelector('.hierarchy-container').getBoundingClientRect();
    
    offsetX = (event.clientX - (roleRect.left + roleRect.width / 2)) / zoomLevel;
    offsetY = (event.clientY - (roleRect.top + roleRect.height / 2)) / zoomLevel;

    function drag(event) {
        if (isDraggingContainer || isDraggingPopup) return; // Prevent dragging role if dragging container or popup

        const container = document.querySelector('.hierarchy-container');
        const containerRect = container.getBoundingClientRect();

        let newLeft = (event.clientX - offsetX - containerRect.left) / zoomLevel;
        let newTop = (event.clientY - offsetY - containerRect.top) / zoomLevel;

        // Ensure role stays within container bounds
        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft + role.offsetWidth > containerRect.width) newLeft = containerRect.width - role.offsetWidth;
        if (newTop + role.offsetHeight > containerRect.height) newTop = containerRect.height - role.offsetHeight;

        role.style.left = `${newLeft}px`;
        role.style.top = `${newTop}px`;

        if (currentEditingRole) {
            const popup = document.getElementById('rolePopup');
            // Update popup position with zoom level
            popup.style.left = `${newLeft + role.offsetWidth + 10}px`;
            popup.style.top = `${newTop}px`;
        }
    }

    function stopDrag() {
        isDraggingRole = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
    }

    isDraggingRole = true;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

function addRole() {
    const container = document.querySelector('.hierarchy-container');
    const containerRect = container.getBoundingClientRect();

    // Calculate the center of the visible area relative to the container
    const visibleCenterX = window.innerWidth / 2 - containerRect.left;
    const visibleCenterY = window.innerHeight / 2 - containerRect.top;

    // Adjust the position for zoom level
    const centerX = visibleCenterX / zoomLevel;
    const centerY = visibleCenterY / zoomLevel;

    // Create the new role and position it at the calculated center
    const role = document.createElement('div');
    role.className = 'role';
    role.style.left = `${centerX}px`;
    role.style.top = `${centerY}px`;
    role.style.transform = 'translate(-50%, -50%)'; // Center the role on its position
    role.textContent = 'New Role';

    // Add event listeners to handle dragging and editing
    role.addEventListener('mousedown', (event) => {
        if (event.button === 0) { // Left mouse button
            startDrag(event, role);
        } else if (event.button === 2) { // Right mouse button
            event.preventDefault(); // Prevent context menu
            editRole(role);
        }
    });

    // Append the new role to the container
    container.appendChild(role);
}



// Function to open the edit popup for a role
function editRole(role) {
    if (currentEditingRole) return; // Prevent opening multiple popups

    currentEditingRole = role;

    // Populate popup fields with the current role's properties
    document.getElementById('editRoleName').value = role.textContent;
    document.getElementById('editRoleColor').value = rgbToHex(role.style.backgroundColor || '#ffffff');
    document.getElementById('editTextColor').value = rgbToHex(role.style.color || '#000000');
    document.getElementById('editRoleFont').value = role.style.fontFamily || 'Arial';

    // Position the popup near the role
    const popup = document.getElementById('rolePopup');
    const roleRect = role.getBoundingClientRect();
    popup.style.display = 'block';
    popup.style.left = `${roleRect.right + 157.5}px`;
    popup.style.top = `${roleRect.top + 232}px`;

    // Make the popup draggable only from the top bar
    const topBar = document.querySelector('#rolePopup .top-bar');
    topBar.addEventListener('mousedown', startPopupDrag);

    // Add event listener to close button
    document.querySelector('#rolePopup .close-btn').addEventListener('click', closePopup);

    // Add event listener to remove button
    document.getElementById('removeBlockBtn').addEventListener('click', removeBlock);
}

// Function to start dragging the popup
function startPopupDrag(event) {
    event.preventDefault();

    if (isDraggingRole || isDraggingContainer) return; // Prevent dragging popup if dragging role or container

    const popup = document.getElementById('rolePopup');
    const popupRect = popup.getBoundingClientRect();
    offsetX = event.clientX - (popupRect.left + popupRect.width / 2);
    offsetY = event.clientY - (popupRect.top + popupRect.height / 2);
    isDraggingPopup = true;

    function dragPopup(event) {
        if (!isDraggingPopup) return;
        const newLeft = event.clientX - offsetX;
        const newTop = event.clientY - offsetY;

        // Update the popup's position
        popup.style.left = `${newLeft}px`;
        popup.style.top = `${newTop}px`;
    }

    function stopPopupDrag() {
        isDraggingPopup = false;
        document.removeEventListener('mousemove', dragPopup);
        document.removeEventListener('mouseup', stopPopupDrag);
    }

    document.addEventListener('mousemove', dragPopup);
    document.addEventListener('mouseup', stopPopupDrag);
}

// Function to remove the current role
function removeBlock() {
    if (currentEditingRole) {
        currentEditingRole.remove();
        closePopup(); // Close the popup menu
    }
}

// Function to save role changes from the popup
function saveRoleChanges() {
    if (currentEditingRole) {
        currentEditingRole.textContent = document.getElementById('editRoleName').value;
        currentEditingRole.style.backgroundColor = document.getElementById('editRoleColor').value;
        currentEditingRole.style.color = document.getElementById('editTextColor').value;
        currentEditingRole.style.fontFamily = document.getElementById('editRoleFont').value;

        closePopup();
    }
}

// Function to close the popup
function closePopup() {
    document.getElementById('rolePopup').style.display = 'none';
    currentEditingRole = null;
}

// Helper function to convert RGB to HEX
function rgbToHex(rgb) {
    if (!rgb) return '#ffffff'; // Default to white
    const rgbValues = rgb.match(/\d+/g);
    if (!rgbValues) return '#ffffff';
    const hex = rgbValues.map((val) => {
        const hexValue = parseInt(val).toString(16);
        return hexValue.length === 1 ? '0' + hexValue : hexValue;
    }).join('');
    return `#${hex}`;
}

// Function to toggle themes menu
function toggleThemesMenu() {
    const menu = document.getElementById('themesMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Function to set the theme
function setTheme(theme) {
    const container = document.querySelector('.hierarchy-container');
    switch (theme) {
        case 'normal':
            container.style.backgroundImage = 'none';
            container.classList.remove('medieval', 'halloween', 'scifi');
            break;
        case 'medieval':
            container.style.backgroundImage = 'url("path/to/medieval-background.jpg")';
            container.classList.remove('halloween', 'scifi');
            container.classList.add('medieval');
            break;
        case 'halloween':
            container.style.backgroundImage = 'url("path/to/halloween-background.jpg")';
            container.classList.remove('medieval', 'scifi');
            container.classList.add('halloween');
            break;
        case 'scifi':
            container.style.backgroundImage = 'url("path/to/scifi-background.jpg")';
            container.classList.remove('medieval', 'halloween');
            container.classList.add('scifi');
            break;
    }
}
