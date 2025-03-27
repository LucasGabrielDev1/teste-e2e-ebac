/// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */


  it('Acessando loja', () => {
    // Acessando Loja
    cy.visit('http://lojaebac.ebaconline.art.br/')
    cy.get('.icon-user-unfollow').click()
    //- LOGIN NO SITE EBAC
    cy.get('#username').type('lukinhascop1@gmail.com')
    cy.get('#password').type('superonze11')
    cy.get('.woocommerce-form > .button').click() 
    //- SELECIONAR ITENS
    cy.get('#primary-menu > .menu-item-629 > a').click()
    cy.get('.post-2559 > .product-block').click()
    cy.get('.button-variable-item-XS').click()
    cy.get('.button-variable-item-Green').click()
    cy.get('.input-text').clear().type(1)
    cy.get('.single_add_to_cart_button').click()
    //SELENCIONANDO OUTRO ITEM
    cy.get('#primary-menu > .menu-item-629 > a').click()
    cy.get('.post-3073 > .product-block').click()
    cy.get('.button-variable-item-32').click()
    cy.get('.button-variable-item-Brown').click()
    cy.get('.input-text').clear().type(1)
    cy.get('.single_add_to_cart_button').click()
    //SELENCIONANDO OUTRO ITEM
    cy.get('#primary-menu > .menu-item-629 > a').click()
    cy.get('.post-3374 > .product-block').click()
    cy.get('.button-variable-item-34').click()
    cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
    cy.get('.input-text').clear().type(1)
    cy.get('.single_add_to_cart_button').click()
    //SELENCIONANDO OUTRO ITEM
    cy.get('#primary-menu > .menu-item-629 > a').click()
    cy.get('.post-3964 > .product-block').click()
    cy.get('.button-variable-item-S').click()
    cy.get('.button-variable-item-Green').click()
    cy.get('.input-text').clear().type(1)
    cy.get('.single_add_to_cart_button').click()
    //ACESSANDO CARRINHO
    cy.get('.woocommerce-message > .button').click()
    //CONFIRMAR CARRINHO
    cy.get('.checkout-button').click()
    //CONFIRMAR PAGAMENTO
    cy.get('#billing_first_name').click().clear().type('Lucas')
    cy.get('#billing_last_name').click().clear().type('Gabriel')
    cy.get('#billing_address_1').click().clear().type('São Paulo')
    cy.get('#billing_address_2').click().clear().type('Casa')
    cy.get('#billing_city').click().clear().type('Andradina')
    cy.get('#billing_postcode').click().clear().type('16920-000')
    cy.get('#billing_phone').click().clear().type('50028922')
    cy.get('#payment_method_cod').click()
    cy.get('#terms').click()
    cy.get('#place_order').click()
    //VALIDANDO MENSAGEM
    cy.wait(7000); // Espera 5 segundos antes de executar o último teste
    cy.get('.woocommerce-notice').should('contain' , 'Obrigado. Seu pedido foi recebido.')
  });
})

