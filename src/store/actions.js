import http from '@/http'
export default{
    getUser(context,ruleForm){
        http.post('/userlogin',ruleForm).then(res=>{
            context.commit('setUser',res.data.list)
           
        })
    }
}