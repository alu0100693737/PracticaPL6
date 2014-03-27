var assert = chai.assert;

suite('Tests', function(){

  test('Test sobre la asignación', function(){
    obj = pl0.parse("a = 3 .")
    assert.equal(obj[0].type, "=")
    assert.equal(obj[0].left.type, "ID")
    assert.equal(obj[0].left.value, "a")
    assert.equal(obj[0].right.type, "NUM")
    assert.equal(obj[0].right.value, "3") 
  });

  test('Test sobre la uuma', function(){
    obj = pl0.parse("a = 2 + 3 .")
    assert.equal(obj[0].right.type, "+")
  });

  test('Test sobre la multiplicación', function(){
    obj = pl0.parse("a = 2 * 3 .")
    assert.equal(obj[0].right.type, "*") 
  });

  test('Test sobre la división', function(){
    obj = pl0.parse("a = 2 / 3 .")
    assert.equal(obj[0].right.type, "/")
  });

  test('Test sobre el paréntesis', function(){
    obj = pl0.parse("a = (2+3) * 3 .")
    assert.equal(obj[0].right.left.type, "+")
  });

  test('Test sobre la precedencia', function(){
    obj = pl0.parse("a = 2+3*3 .")
    assert.equal(obj[0].right.left.type, "NUM")
  });

  test('Test sobre la comparación', function(){
    obj = pl0.parse("IF a == 3 THEN b = 2 .")
    assert.equal(obj[0].condition.type, "==")
  });

  test('block', function(){
    obj = pl0.parse("CONST a = 3; VAR b; PROCEDURE p; a = a + 3; CALL p.")
    assert.equal(obj[0].left.type, "CONST ID")
    assert.equal(obj[1].type, "VAR ID")
    assert.equal(obj[2].type, "PROCEDURE")
  });

  test('CALL', function(){
    obj = pl0.parse("CALL a .")
    assert.equal(obj[0].type, "CALL")
  });

  test('IF, IFELSE', function(){
    obj = pl0.parse("IF a == 3 THEN b = 3.")
    assert.equal(obj[0].type, "IF")

    obj = pl0.parse("IF a == 3 THEN b = 3 ELSE b = 2.")
    assert.equal(obj[0].type, "IFELSE")
  });

  test('ODD', function(){
    obj = pl0.parse("IF ODD 3 THEN b = 2 .")
    assert.equal(obj[0].condition.type, "ODD")
  });

  test('WHILE DO', function(){
    obj = pl0.parse("WHILE a == 3 DO b = b+3.")
    assert.equal(obj[0].type, "WHILE")
  });

  test('BEGIN END', function(){
    obj = pl0.parse("BEGIN a = 3; b = b+3 END.")
    assert.equal(obj[0].type, "BEGIN")
  });


  test('Prueba de error de sintaxis', function(){
    assert.throws(function() { pl0.parse("a = 3"); }, /Expected "."/);
  });

});
