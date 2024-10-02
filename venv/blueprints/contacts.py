from flask import Blueprint, request, jsonify
from validators.validators import validate_email, validate_contact_data
from data import contacts, next_id  # Importa as variáveis globais

contact_routes = Blueprint('contact_routes', __name__)

#Adcionar Contato a lista
@contact_routes.route('/add', methods=['POST'])
def add_contact():
    global next_id  # Referenciar a variável global next_id
    data = request.get_json()

    # Validação dos dados de contato, passando contacts como argumento
    validation_response = validate_contact_data(data, contacts)
    if validation_response:  # Se a validação retornar algo, um erro ocorreu
        return validation_response

    # Criação do contato com um ID automático
    contact = {
        "id": next_id,  # Atribui o ID atual
        "name": data['name'],
        "phone": data['phone'],
        "email": data['email']
    }

    contacts.append(contact)  # Adiciona o contato à lista
    next_id += 1  # Incrementa o ID para o próximo contato
    return jsonify({"message": "Contato adicionado com sucesso!", "contact": contact}), 201

#Buscar todos os Contatos 
@contact_routes.route('/', methods=['GET'])
def get_contacts():
    #Verificar se existe contatos na lista
    if len(contacts) == 0:
        return jsonify({"message": "Nenhum contato encontrado."}), 404
    return jsonify({"message": "Contatos encontrados!", "contacts": contacts}), 200

#Buscar contatos por id
@contact_routes.route('/<int:id>', methods=['GET'])
def get_contact_by_id(id):

    #Buscar por Id
    contact = next((contact for contact in contacts if contact["id"] == id), None)

    #Verificar se o Id existe
    if contact:
        return jsonify({"contact": contact}), 200
    else:
        return jsonify({"message": "Contato não encontrado."}), 404

#Atualizar contato 
@contact_routes.route('/update/<int:id>', methods=['PUT'])
def update_contact(id):
    # Busca o contato pelo ID
    contact = next((contact for contact in contacts if contact["id"] == id), None)

    if contact:
        data = request.get_json()
        new_name = data.get('name', contact['name'])  # Atualiza o nome
        new_phone = data.get('phone', contact['phone'])  # Atualiza o telefone
        new_email = data.get('email', contact['email'])  # Atualiza o email

        # Valida o e-mail antes de atualizar
        if new_email and not validate_email(new_email):
            return jsonify({"error": "E-mail inválido"}), 400
        

        # Atualização dos dados
        contact['name'] = new_name
        contact['phone'] = new_phone
        contact['email'] = new_email

        return jsonify({"message": "Contato atualizado com sucesso!", "contact": contact}), 200
    else:
        return jsonify({"message": "Contato não encontrado."}), 404
 #Deletar contato
@contact_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_contact(id):
    # Busca o contato pelo ID
    contact = next((contact for contact in contacts if contact["id"] == id), None)

    if contact:
        # Remove o contato da lista
        contacts.remove(contact)
        return jsonify({"message": "Contato deletado com sucesso!"}), 200
    else:
        return jsonify({"message": "Contato não encontrado."}), 404
