export const updateProfile = (firstname: string, lastname: string) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();
  cy.getByTestId('ProfileCard.firstname').clear().type(firstname);
  cy.getByTestId('ProfileCard.lastname').clear().type(lastname);
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => {
  cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: 'sdfsd' },
    body: {
      id: '4',
      first: 'Петр',
      lastname: 'Петров',
      age: 48,
      currency: 'USD',
      country: 'Ukraine',
      city: 'Kiev',
      username: 'JLen',
      avatar: 'https://ustaliy.ru/wp-content/uploads/2021/04/test-chto-vy-znaete-o-dzhone-lennone-scaled.jpeg',
    },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstname: string, lastname: string): Chainable<void>
      resetProfile(profileId: string): Chainable<void>
    }
  }
}
