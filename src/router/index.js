//该文件专门用于创建整个应用的路由
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//引入组件
import PersonalInfo from "@/components/module/UserInfo/PersonalInfo";
import ChangePassword from "@/components/module/UserInfo/ChangePassword";
import StudentList from "@/components/module/UserInfo/StudentList";
import UpInsStuInfo from "@/components/module/UserInfo/UpInsStuInfo";


//创建并暴露一个路由器
const router = new VueRouter({
    routes:[
        {
            path:'/personalInfo',
            name:'personalInfo',
            component:PersonalInfo,
        },
        {
            path:'/changePassword',
            name:'changePassword',
            component:ChangePassword,
        },
        {
            path:'/studentList',
            name:'studentList',
            component:StudentList,
        },
        {
            path:'/upInsStuInfo',
            name:'upInsStuInfo',
            component:UpInsStuInfo,
        },
    ]
})

//全局前置路由守卫--初始化的时候被调用，每次切换路由之前被调用
router.beforeEach((to, from, next)=>{
    console.log('前置路由守卫',to,from);
    if (to.meta.isAuth){//判断是否需要鉴权
        console.log('前置路由守卫',to,from);
        if (localStorage.getItem('Tab') !== ''){
            next();
        }else{
            if (to.path === '/'){
                next();
            }else {
                next({
                    path:'/'
                });
            }
        }
    }else{
        next();
    }
})

export default router;
