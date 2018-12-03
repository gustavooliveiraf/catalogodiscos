import NewCollection from './components/newCollection/NewCollection.vue';
import Home from './components/home/Home.vue';
import Disc from './components/disc/Disc.vue';
import DiscCollection from './components/shared/discCollection/DiscCollection.vue'
import newDisc from './components/disc/NewDisc.vue'

export const routes = [
    { path: '', name: 'home', component: Home, titulo: 'Coleções', menu: true},
    { path: '/discs', name: 'disc', component: Disc, titulo: 'Discos', menu: true},
    { path: '/novacolecao', name: 'collection', component: NewCollection, titulo: 'Nova coleção', menu: true},
    { path: '/novacolecao/:id', name: 'changeCollection', component: NewCollection, titulo: 'Nova coleção', menu: false},
    { path: '/novodisco', name: 'newdisc', component: newDisc, titulo: 'Novo disco', menu: true},
    { path: '/discCollection/:id', name: 'discCollection', component: DiscCollection, menu: false},
    { path: '*', component: Home, menu: false}
];
