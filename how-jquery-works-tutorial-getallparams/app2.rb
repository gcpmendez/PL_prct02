require 'sinatra'

set :public_folder, File.dirname(__FILE__) + '/starterkit'
set :bind, '0.0.0.0'
#set :port, 8080

get '/' do
  erb :index
end

get '/chuchu' do
  if request.xhr? # is an ajax request
    "hello world!"
  else 
    erb :tutu
  end
end

__END__

@@layout
  <!DOCTYPE html>
  <html>
    <head>
        <meta charset="utf-8" />
        <title>Demo</title>
    </head>
    <body>
        <a href="http://jquery.com/">jQuery</a>
        <div class="result"></div>
        <script src="jquery.js"></script>
        <%= yield %>
    </body>
  </html>

@@tutu
  <h1>Not an Ajax Request!</h1>

@@index
  <script>
    var param = "chuchu param";
    var handler = function( data, textStatus, jqXHR, param ) {
      $( ".result" ).html( data );
      alert( "Load was performed.\n"+
             "$data = "+data+
             "\ntextStatus = "+textStatus+
             "\njqXHR = "+JSON.stringify(jqXHR)+
             "\nparam = "+param );
    };
    $( document ).ready(function() {
        $( "a" ).click(function( event ) {
            event.preventDefault();
            $.get( "/chuchu", function(data, textStatus, jqXHR ) {
              handler( data, textStatus, jqXHR, param);
            });
        });
    });
  </script>
