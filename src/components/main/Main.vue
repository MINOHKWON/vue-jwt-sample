<template>
    <div class="container">
        <div class="card card-container"> 
            <label>{{ responseData }}</label>
            <button class="btn btn-primary" @click="authTest">토큰 테스트</button>
            <button class="btn btn-primary" @click="tokenReissue">토큰 재발급</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'Main',
    components: {},
    inject:['$store', '$axios'],
    data() {
        return {
            memberId: '',
            password: '',
            responseData : '결과'
        };
    },
    methods: {
        authTest : function () {
            fetch('/members/test', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json;charset=utf-8',
                    'Authorization' : this.$store.state.token.grant_type + ' ' + this.$store.state.token.access_token
                },
                // body: JSON.stringify(user)
            }).then(response => {
                this.responseData = response;
            })
            .catch(err => {
                // 에러 처리
                console.log(err);
            });
        },
        tokenReissue : function () {
            const reissueForm = {
                memberId : 'jjh',
                accessToken : this.$store.state.token.access_token
            };

            this.$axios.post('http://localhost:8081/members/reissue', reissueForm).then((res) => {
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
            this.$axios.defaults.headers.common['Authorization'] = this.$store.state.token.grant_type + ' ' + this.$store.state.token.access_token;
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

.card > label, input, button {
    margin-top:5px;
}
</style>