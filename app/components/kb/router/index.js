import VueRouter from 'https://unpkg.com/vue-router/dist/vue-router.js';
import About from '../about.vue';
import Profile from '../profile.vue';
const routes = [
	{
		path: '/',
		name: 'Profile',
		component: Profile
	},
	{
		path: '/About',
		name: 'About',
		component: About,
	}
]

const router = VueRouter({
	routes
})

export default router
