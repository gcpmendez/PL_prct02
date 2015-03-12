var assert = chai.assert;
var tabla_ej = '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>4</td>                                  <td> 6</td>                                  <td> e </td>              </tr>\n<tr>                    <td>8</td>                                  <td> t</td>                                  <td> 2</td>              </tr>\n</tbody></table>';


suite('Comma Separated Values', function() {

  setup(function(){
    if (typeof __html__ !== 'undefined') {
      document.body.innerHTML = __html__['tests/index.html'];
      original = document.getElementById('original');
      converted = document.getElementById('finaltable');
    }
  });
  
//  test('Button esta llamando a la función calculate()', function() {
//  	original.value = "25";
//  	$("button").trigger("click");
//  	assert.deepEqual(finaltable.innerHTML, '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>25</td>              </tr>\n</tbody></table>');
//  });
  
//  test('alert is getting showed on error', function() {
//  	original.value = "";
//  	window.alert = function() {};
//    var _savedAlert = window.alert; 
//		try{
//			var spy = sinon.spy(window, 'alert');
//			calculate();
//			sinon.assert.called(spy);
//		}finally{ 
//			window.alert = _savedAlert; 
//		}
//  });
  
  
  test('localStorage funcionando', function() {
  	original.value = "A";
    calculate();
    if (window.localStorage) assert.deepEqual(localStorage.original, original.value);
  });

  test('La función *calculate trabaja con un valor', function() {
    original.value = "1";
    calculate();
    assert.deepEqual(finaltable.innerHTML, '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>1</td>              </tr>\n</tbody></table>');
  });
  
  test('La función *calculate trabaja con diferentes valores', function() {
    original.value = "1, 2, A";
    calculate();
    assert.deepEqual(finaltable.innerHTML, '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>1</td>                                  <td> 2</td>                                  <td> A</td>              </tr>\n</tbody></table>');
  });
  
  test('La función *caculate trabaja en diferentes lineas', function() {
    original.value = "32\n25, DD";
    calculate();
    assert.deepEqual(finaltable.innerHTML, '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>32</td>              </tr>\n<tr class="error">                    <td>25</td>                                  <td> DD</td>              </tr>\n</tbody></table>');
  });
     test('Prueba de creación de la tabla', function(){
      original.value = "4, 6, e \n 8, t, 2";
      calculate();
      assert.deepEqual(finaltable.innerHTML, tabla_ej);
    });
    test('Prueba del localStorage', function(){
      if (window.localStorage)
      assert.deepEqual(localStorage.original, '4, 6, e \n 8, t, 2');
    });
});