// fake copy of stripe with same charges property and create function
// it only execute it in test environment 
export const stripe = {
  charges: {
    create: jest.fn().mockResolvedValue({id: 'abcd'})
  }
}