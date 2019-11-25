<template>
  <div class="login-request">
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  mounted: function() {
    this.alertLogin()
  },
  
  methods: {
    alertLogin() {
      let code = this.getQueryString('code')



      $.ajax({
        url:   '/user/bind?code=' + code,
        headers: {
          "Content-Type": "application/json",
          'Authorization': this.cut(this.getUrlParams("state"))
        },
        complete: xhr => {

          this.$store.commit('changeAuthorization', this.cut(this.getUrlParams("state")))

        },
        success:  (msg) => {
          if(msg.code == -1) {
            alert("微信绑定失败")
          } else {
            alert('微信绑定成功')
          }
          this.$router.replace({name: "myPrinter"});
        }
      })
    },


    getUrlParams(name) { // 不传name返回所有值，否则返回对应值
        var url = window.location.href;
        if (url.indexOf('?') == 1) { return false; }
        url = url.substr(1);
        url = url.split('&');
        var name = name || '';
        var nameres;
        // 获取全部参数及其值
        for(var i=0;i<url.length;i++) {
            var info = url[i].split('=');
            var obj = {};
            obj[info[0]] = decodeURI(info[1]);
            url[i] = obj;
        }
        // 如果传入一个参数名称，就匹配其值
        if (name) {
            for(var i=0;i<url.length;i++) {
                for (const key in url[i]) {
                    if (key == name) {
                        nameres = url[i][key];
                    }
                }
            }
        } else {
            nameres = url;
        }
        // 返回结果
        return nameres;
    },
    getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if(r != null) {
          return unescape(r[2]);
      }
      return null;
    },
    cut(str) {
        let newstr = str.split("#")
        return newstr[0]
    }
  }
}
</script>

<style>

</style>