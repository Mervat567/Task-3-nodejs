const sum=require("../sum")


test("should return sum two numbers",async()=>{
  
    expect(sum(3,6)).toBe(9)
})

test("should return error",async()=>{
  
    expect(sum("c",6)).toBe(0)
})