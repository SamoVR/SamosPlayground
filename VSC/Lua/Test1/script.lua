local numTable = {1,6,3,9,4,3}
local numRand = math.random(1,6)

print("start")
for i,v in ipairs(numTable) do
    if i == numRand then
        print(v)
    end
end