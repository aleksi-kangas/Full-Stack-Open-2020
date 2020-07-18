describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'admin',
      name: 'Administrator',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('.loginForm')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.get('html').contains('Administrator logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'admin', password: 'password' })
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function() {
      // Open the blog form
      cy.contains('New Blog').click()
      // Input blog information
      cy.get('#title').type('Title')
      cy.get('#author').type('Author')
      cy.get('#url').type('www.url.com')
      // Submit form
      cy.get('#submit-button').click()

      cy.get('.blogs').contains('Title')
      cy.get('.blogs').contains('Author')
    })
  })
})