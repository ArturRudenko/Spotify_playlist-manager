import store from '@/store';

export default async function auth({ router }) {
  if (!store.getters['account/accessToken']) {
    router.push({
      name: 'login',
    })
  }
}
