export default {
  edit: {
    getNavigatePath: ( uid ) => `edit/${ uid }`,
    path: 'edit/:uid',
  },
  list: {
    getNavigatePath: () => baseUrl,
    path: '',
  },
}

export const baseUrl = '/applications'
