from flask import Flask
from flask_cors import CORS 
from blueprints.contacts import contact_routes
from data import contacts, next_id  # Importa as variáveis globais

app = Flask(__name__)

# Estava dando alguns problemas referente ao Cors tentei limitar, para ver os metodos passavam sem dar erro
CORS(app, resources={r"/contacts/*": {"origins": "*"}}, methods=['GET', 'POST', 'PUT', 'DELETE'])


# Registra o blueprint
app.register_blueprint(contact_routes, url_prefix='/contacts')

if __name__ == "__main__":
    app.run(debug=True)
