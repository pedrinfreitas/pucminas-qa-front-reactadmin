describe("User CRUD Operations", () => {
  beforeEach(() => {
    cy.task("db:erase");
    cy.visit("http://localhost:3000");
  });

  describe("Listagem de usuários", () => {
    it('Validar que a mensagem "No users yet." é exibido quando não existir nenhum usuário no banco de dados', () => {
      cy.visit("http://localhost:3000");

      cy.contains("No User yet");
      cy.contains("Do you want to add one?");
    });

    it("Validar se um usuário está sendo listado", () => {
      cy.task("db:create:user", {
        name: "Pedro",
        email: "pedrinfreitas@gmail.com",
        password: "123456",
      });
      cy.contains("Pedro");
      cy.contains("pedrinfreitas@gmail.com");
      cy.contains("123456");
    });
  });

  describe("Criar um usuário", () => {
    it("Validar a criação de um novo usuário no banco de dados clicando no botão save", () => {
      cy.get(".RaCreateButton-root").click();
      cy.get("#name").type("Pedro");
      cy.get("#email").type("pedrinfreitas@gmail.com");
      cy.get("#password").type("123456");
      cy.get(".RaToolbar-defaultToolbar > .MuiButtonBase-root").click();

      cy.contains("Element created");
      cy.contains("Pedro");
      cy.contains("pedrinfreitas@gmail.com");
      cy.contains("123456");
    });

    it("Validar a criação de um novo usuário no banco de dados apertando a tecla enter do teclado", () => {
      cy.get(".RaCreateButton-root").click();
      cy.get("#name").type("Pedro");
      cy.get("#email").type("pedrinfreitas@gmail.com");
      cy.get("#password").type("123456");
      cy.get(".RaToolbar-defaultToolbar > .MuiButtonBase-root").type(
        "{enter}",
        { force: true }
      );

      cy.contains("Element created");
      cy.contains("Pedro");
      cy.contains("pedrinfreitas@gmail.com");
      cy.contains("123456");
    });
  });

  describe("Editar um usuário", () => {
    it("Validar a edição de um usuário existente no banco de dados", () => {
      cy.task("db:create:user", {
        name: "Pedro",
        email: "pedrinfreitas@gmail.com",
        password: "123456",
      });

      cy.visit("http://localhost:3000");

      cy.get(".MuiTableBody-root > :nth-child(1) > .column-id").click();

      cy.get("#name").clear().type("pedroteste");
      cy.get("#email").clear().type("pedroteste@gmail.com");
      cy.get("#password").clear().type("654321");
      cy.get(".RaToolbar-defaultToolbar > .MuiButton-contained").click();

      cy.contains("Element updated");
      cy.contains("pedroteste");
      cy.contains("pedroteste@gmail.com");
      cy.contains("654321");
    });

    it('Cancelar a edição de um usuário depois de preencher o formulário e clicar no botão "Save"', () => {
      cy.task("db:create:user", {
        name: "Pedro",
        email: "pedrinfreitas@gmail.com",
        password: "123456",
      });

      cy.visit("http://localhost:3000");

      cy.get(".MuiTableBody-root > :nth-child(1) > .column-id").click();

      cy.get("#name").clear().type("pedroteste");
      cy.get("#email").clear().type("pedroteste@gmail.com");
      cy.get("#password").clear().type("654321");
      cy.get(".RaToolbar-defaultToolbar > .MuiButton-contained").click();
      cy.get(".MuiSnackbarContent-action > .MuiButtonBase-root").click();

      cy.contains("Element updated");
      cy.contains("Pedro");
      cy.contains("pedrinfreitas@gmail.com");
      cy.contains("123456");
    });
  });

  describe("Remover usuário", () => {
    it("Validar a remoção de um usuário no banco de dados", () => {
      cy.task("db:create:user", {
        name: "Pedro",
        email: "pedrinfreitas@gmail.com",
        password: "123456",
      });

      cy.visit("http://localhost:3000");

      cy.get(".MuiTableBody-root > :nth-child(1) > .column-id").click();
      cy.get(".MuiButton-text").click();

      cy.contains("No User yet");
    });

    it('Cancelar a remoção de um usuário depois de clicar no botão "Delete"', () => {
      cy.task("db:create:user", {
        name: "Pedro",
        email: "pedrinfreitas@gmail.com",
        password: "123456",
      });

      cy.visit("http://localhost:3000");

      cy.get(".MuiTableBody-root > :nth-child(1) > .column-id").click();
      cy.get(".MuiButton-text").click();
      cy.get(".MuiSnackbarContent-action > .MuiButtonBase-root").click();

      cy.contains("Pedro");
      cy.contains("pedrinfreitas@gmail.com");
      cy.contains("123456");
    });
  });
});
