<template>
    <div class="container">
        <div class="card card-container">
            <label></label>
            <input type="text" id="txt_memberId" class="form-control" placeholder="ID" v-model="memberId" required autofocus/>
            <input type="password" id="txt_password" class="form-control" placeholder="PASSWORD" v-model="password" required/>
            <button class="btn btn-primary" @click="submitForm">Login</button>
        </div>
    </div>
</template>

<script>
// 로그인 화면 진입시 로컬스토리지 삭제
window.localStorage.clear();
export default {
    name:'Login',
    components: {},
    inject:['$store', '$axios'],
    data() {
        return {
            memberId: '',
            password: ''
        };
    },
    methods: { 
        submitForm : function() {
            const formData = {
                memberId : this.memberId,
                password : this.password
            };
            this.$axios.post('/members/login', formData).then((res) => {
                if (200 == res.status) {
                    // ACCESS 토큰 저장
                    this.$store.commit("setACT", {
                        grant_type : res.data.grantType,
                        access_token : res.data.accessToken
                    }); 

                    // Authorization 헤더 설정 및 main redirect
                    this.setAuthSet();
                } else {
                    // 에러 처리
                    console.log(res);
                }
            }).catch((err) => {
                // 에러 처리
                console.log(err);
            });
        },
        setAuthSet : function() {
            // AXIOS ACCESS 토큰 설정
            this.$axios.defaults.headers.common['Authorization'] = this.$store.state.token.grant_type + ' ' + this.$store.state.token.access_token;
            this.$router.push({ name : 'main' }); 
        }
    }
}
</script>

<style>
.card-container.card {
    max-width: 400px;
    padding: 40px 40px;
    margin-top:200px;
}

/*
 * Card component
 */
.card {
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.card > input, button {
    margin-top:5px;
}
</style>