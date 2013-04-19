describe("Get field under mouse", function() {
  it('should return the correct field', function() {
    expect(coordsToField(82,236)).toEqual([1,4]);
    expect(coordsToField(85,112)).toEqual([1,1]);
    expect(coordsToField(338,193)).toEqual([7,3]);
    expect(coordsToField(463,80)).toEqual([10,0]);
    expect(coordsToField(728,367)).toEqual([16,7]);
    expect(coordsToField(502,367)).toEqual([11,7]);
  })
});


describe("Put field depending on field ID", function() {
  it('should return the correct x,y values', function() {
    expect(fieldToCoords(1,4)).toEqual([60,216]);
    expect(fieldToCoords(1,1)).toEqual([60,90]);
    expect(fieldToCoords(7,3)).toEqual([312,174]);
    expect(fieldToCoords(10,1)).toEqual([438,90]);
    expect(fieldToCoords(16,7)).toEqual([710,342]);
    expect(fieldToCoords(11,7)).toEqual([500,342]);
  })
});