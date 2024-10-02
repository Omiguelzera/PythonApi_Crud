from flask import Flask, request, jsonify
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Armazenamento em memória (lista de dicionários)
contacts = []

# Função de validação de e-mail
def validate_email(email):
    pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(pattern, email)

# Rota para o menu inicial
@app.route('/', methods=['GET'])
def menu():
    return jsonify({
        "message": "Menu Principal",
        "options": [
            "1. Adicionar contato",
            "2. Listar contatos",
            "3. Buscar contato",
            "4. Atualizar contato",
            "5. Deletar contato",
            "6. Sair"
        ]
    })

# Rota para adicionar um novo contato
@app.route('/add', methods=['POST'])
def add_contact():
    data = request.get_json()
    name = data.get('name')
    phone = data.get('phone')
    email = data.get('email')

    # Validação básica
    if not name or not phone or not email:
        return jsonify({"error": "Nome, telefone e e-mail são obrigatórios"}), 400
    if not validate_email(email):
        return jsonify({"error": "E-mail inválido"}), 400

    # Adiciona o contato à lista
    contact = {"name": name, "phone": phone, "email": email}
    contacts.append(contact)
    return jsonify({"message": "Contato adicionado com sucesso!", "contact": contact}), 201

# Rota para listar todos os contatos
@app.route('/contacts', methods=['GET'])
def get_contacts():
    if len(contacts) == 0:
        return jsonify({"message": "Nenhum contato encontrado."}), 404
    return jsonify({"contacts": contacts}), 200

# Rota para buscar contato específico pelo nome
@app.route('/contact/<name>', methods=['GET'])
def get_contact_by_name(name):
    contact = next((contact for contact in contacts if contact["name"].lower() == name.lower()), None)
    
    if contact:
        return jsonify({"contact": contact}), 200
    else:
        return jsonify({"message": "Contato não encontrado."}), 404

# Rota para atualizar um contato
@app.route('/update/<name>', methods=['PUT'])
def update_contact(name):
    contact = next((contact for contact in contacts if contact["name"].lower() == name.lower()), None)

    if contact:
        data = request.get_json()
        new_name = data.get('name', contact['name'])
        new_phone = data.get('phone', contact['phone'])
        new_email = data.get('email', contact['email'])

        if new_email and not validate_email(new_email):
            return jsonify({"error": "E-mail inválido"}), 400

        contact['name'] = new_name
        contact['phone'] = new_phone
        contact['email'] = new_email
        return jsonify({"message": "Contato atualizado com sucesso!", "contact": contact}), 200
    else:
        return jsonify({"message": "Contato não encontrado."}), 404

# Rota para deletar um contato
@app.route('/delete/<name>', methods=['DELETE'])
def delete_contact(name):
    global contacts
    contact = next((contact for contact in contacts if contact["name"].lower() == name.lower()), None)

    if contact:
        contacts = [c for c in contacts if c["name"].lower() != name.lower()]
        return jsonify({"message": f"Contato '{name}' deletado com sucesso!"}), 200
    else:
        return jsonify({"message": "Contato não encontrado."}), 404

if __name__ == "__main__":
    app.run(debug=True)