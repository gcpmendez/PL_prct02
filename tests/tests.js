var assert = chai.assert;
var tabla_ej = '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>4</td>                                  <td> 6</td>                                  <td> e </td>              </tr>\n<tr>                    <td>8</td>                                  <td> t</td>                                  <td> 2</td>              </tr>\n</tbody></table>';

suite('CSV', function() {
    setup(function(){
        if (typeof __html__ !== 'undefined') {
            document.body.innerHTML = __html__['tests/index.html'];
            original = document.getElementById('original');
            finaltable = document.getElementById('resultado');
        }
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