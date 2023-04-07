import { createRouter, createWebHashHistory } from "vue-router";

const PessoaContent = () => import("../components/Pessoa/PessoaContent");
const AnimalContent = () => import("../components/Animal/AnimalContent");
const LoteContent = () => import("../components/Lote/LoteContent");
const AnimaisLotesContent = () => import("../components/AnimaisLotes/AnimaisLotesContent");

const routes = [
  { path: '/animal', name: "animal", component: AnimalContent },
  { path: '/lote', name: "lote", component: LoteContent },
  { path: '/relacao', name: "relacao", component: AnimaisLotesContent },
  { path: '/', name: "pessoa", component: PessoaContent }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;