export const checkoutData = {
    valid: {
        firstName: 'Everton',
        lastName: 'QA',
        postalCode: '12345',
    },
    invalid: {
        firstName: '',
        lastName: '',
        postalCode: '',
    },
    missingPostalCode: {
        firstName: 'Everton',
        lastName: 'QA',
        postalCode: ''
    },
    missingFirstName: {
        firstName: '',
        lastName: 'QA',
        postalCode: '12345'
    },
};