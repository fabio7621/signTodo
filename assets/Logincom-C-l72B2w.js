import{u as d,d as m,c as p,a as e,w as l,v as i,b as u,e as _,f,g as h,r as x,o as b,h as g}from"./index-DpiG5eUE.js";const w=e("h2",null,"最實用的線上代辦事項服務",-1),v={class:"login-from-item"},k=e("label",{for:""},"Email",-1),y={class:"login-from-item d-flex flex-cloun"},V=e("label",{for:""},"密碼",-1),B={class:"d-flex flex-column mx-auto"},C="https://todolist-api.hexschool.io",$={__name:"Logincom",setup(E){const r=d(),o=m({email:"",password:""}),n=async()=>{try{const t=await h.post(`${C}/users/sign_in`,o);alert("登入成功"),document.cookie=`fabio20token=${t.data.token};expires=${new Date(t.data.exp*1e3)}; path=/`,o.email="",o.password="",console.log(t),r.push("/todo")}catch(t){alert("登入失敗"),console.log(t.message)}};return(t,s)=>{const c=x("router-link");return b(),p("form",{class:"login-from",onSubmit:f(n,["prevent"])},[w,e("div",v,[k,l(e("input",{placeholder:"請輸入Email","onUpdate:modelValue":s[0]||(s[0]=a=>o.email=a),type:"email",required:""},null,512),[[i,o.email]])]),e("div",y,[V,l(e("input",{placeholder:"請輸入密碼","onUpdate:modelValue":s[1]||(s[1]=a=>o.password=a),type:"password"},null,512),[[i,o.password]])]),e("div",B,[e("button",{onClick:n,class:"member-sumit-btn btn",type:"button"},"登入"),u(c,{to:"/register",class:"member-sumit-btn btn",type:"button "},{default:_(()=>[g("註冊帳號")]),_:1})])],32)}}};export{$ as default};
