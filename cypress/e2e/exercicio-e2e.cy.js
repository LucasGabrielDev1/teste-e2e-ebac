/// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {

  const dadosLogin = {
    email: 'lukinhascop1@gmail.com',
    senha: 'superonze11',
  };

  const produtos = [
    { id: 2559, tamanho: 'XS', cor: 'Green' },
    { id: 3073, tamanho: '32', cor: 'Brown' },
    { id: 3374, tamanho: '34', cor: 'Black' }, // Ajuste a cor conforme necessário
    { id: 3964, tamanho: 'S', cor: 'Green' },
  ];

  const dadosCheckout = {
    nome: 'Lucas',
    sobrenome: 'Gabriel',
    endereco: 'São Paulo',
    complemento: 'Casa',
    cidade: 'Andradina',
    cep: '16920-000',
    telefone: '50028922',
  };

  const login = (email, senha) => {
    cy.get('.icon-user-unfollow').click();
    cy.get('#username').type(email);
    cy.get('#password').type(senha);
    cy.get('.woocommerce-form > .button').click();
  };

  const selecionarProduto = ({ id, tamanho, cor }) => {
    cy.get('#primary-menu > .menu-item-629 > a').click();
    cy.get(`.post-${id} > .product-block`).click();
    cy.get(`.button-variable-item-${tamanho}`).click();
    cy.get(`.button-variable-item-${cor}`).click();
    cy.get('.input-text').clear().type(1);
    cy.get('.single_add_to_cart_button').click();
  };

  const preencherCheckout = ({
    nome,
    sobrenome,
    endereco,
    complemento,
    cidade,
    cep,
    telefone
  }) => {
    cy.get('#billing_first_name').clear().type(nome);
    cy.get('#billing_last_name').clear().type(sobrenome);
    cy.get('#billing_address_1').clear().type(endereco);
    cy.get('#billing_address_2').clear().type(complemento);
    cy.get('#billing_city').clear().type(cidade);
    cy.get('#billing_postcode').clear().type(cep);
    cy.get('#billing_phone').clear().type(telefone);
    cy.get('#payment_method_cod').click();
    cy.get('#terms').click();
    cy.get('#place_order').click();
  };

  it('Deve realizar o fluxo completo de compra com 4 produtos', () => {
    cy.visit('http://lojaebac.ebaconline.art.br/');
    
    login(dadosLogin.email, dadosLogin.senha);

    produtos.forEach(produto => {
      selecionarProduto(produto);
    });

    // Acessar carrinho e finalizar pedido
    cy.get('.woocommerce-message > .button').click();
    cy.get('.checkout-button').click();

    preencherCheckout(dadosCheckout);

    // Validar mensagem de sucesso
    cy.wait(7000);
    cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.');
  });

});
