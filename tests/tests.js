var assert = chai.assert;


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
    original.value = "1\n2, A";
    calculate();
    assert.deepEqual(finaltable.innerHTML, '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>1</td>              </tr>\n<tr class="error">                    <td>2</td>                                  <td> A</td>              </tr>\n</tbody></table>');
  });

  
});