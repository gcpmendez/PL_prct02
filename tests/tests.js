var assert = chai.assert;

suite('Comma Separated Values', function() {

  setup(function(){
    if (typeof __html__ !== 'undefined') {
      document.body.innerHTML = __html__['tests/index.html'];
      original = document.getElementById('original');
      converted = document.getElementById('finaltable');
    }
  });
  
  test('click button is calling calculate()', function() {
  	original.value = "25";
  	$("button").trigger("click");
  	assert.deepEqual(finaltable.innerHTML, '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>25</td>              </tr>\n</tbody></table>');
  });
  
  test('alert is getting showed on error', function() {
  	original.value = "";
  	window.alert = function() {};
    var _savedAlert = window.alert; 
		try{
			var spy = sinon.spy(window, 'alert');
			calculate();
			sinon.assert.called(spy);
		}finally{ 
			window.alert = _savedAlert; 
		}
  });
  
  test('localStorage working', function() {
  	original.value = "25";
    calculate();
    if (window.localStorage) assert.deepEqual(localStorage.original, original.value);
  });

  test('calculate function working on 1 value', function() {
    original.value = "32F";
    calculate();
    assert.deepEqual(finaltable.innerHTML, '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>32F</td>              </tr>\n</tbody></table>');
  });
  
  test('La función *calculate trabaja con diferentes valorea', function() {
    original.value = "1, 2, A";
    calculate();
    assert.deepEqual(finaltable.innerHTML, '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>1</td>                                  <td> 2</td>                                  <td> A</td>              </tr>\n</tbody></table>');
  });
  
  test('La función *caculate trabaja en diferentes lineas', function() {
    original.value = "32\n25, DD";
    calculate();
    assert.deepEqual(finaltable.innerHTML, '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>32</td>              </tr>\n<tr class="error">                    <td>25</td>                                  <td> DD</td>              </tr>\n</tbody></table>');
  });
});