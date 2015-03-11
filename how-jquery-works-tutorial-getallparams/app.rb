require 'sinatra'
require 'sinatra/reloader' if development?
require 'pp'

set :public_folder, File.dirname(__FILE__) + '/starterkit'

get '/' do
  erb :index
end

get '/chuchu' do
  pp env
  p params[:nombres]
  if request.xhr? # is an ajax request
   %q{{"answer": "Server responds: hello world!"}}
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

@@index
  <script>
  $( document ).ready(function() {
      $( "a" ).click(function( event ) {
          event.preventDefault();
          $.get( "/chuchu", {nombres: ["juan", "pedro"]}, function( data ) {
            $( ".result" ).html( data["answer"]);
            console.log(data);
            alert( "Load was performed." );
          }, 'json');
      });
  });
  </script>

@@tutu
  <h1>Not an Ajax Request!</h1>
