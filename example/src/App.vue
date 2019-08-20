<template>
  <div id="app">
    <section class="content-1">
      <h3>将页面导出为pdf</h3>
      <el-form label-width="120px">
        <el-form-item label="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="cookies（选填）">
          <el-input v-model="form.cookies"></el-input>
        </el-form-item>
        <el-form-item label="参数（选填）">
          <el-input v-model="form.params"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="handleClick" type="primary">
        页面导出为pdf
      </el-button>
    </section>

    <section class="content-1">
      <h3>多个页面导出为pdf</h3>
      <el-form label-width="120px">
        <el-form-item label="url">
          <el-input type="textarea" placeholder="多个url使用逗号分隔" v-model="form1.urls"></el-input>
        </el-form-item>
        <el-form-item label="cookies（选填）">
          <el-input v-model="form1.cookies"></el-input>
        </el-form-item>
        <el-form-item label="参数（选填）">
          <el-input v-model="form1.params"></el-input>
        </el-form-item>
      </el-form>

      <el-button @click="multiDownload" type="primary">
        页面导出为pdf
      </el-button>
    </section>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data () {
    return {
      form: {
        url: '',
        cookies: '',
        params: ''
      },
      form1: {
        urls: '',
        cookies: '',
        params: ''
      }
    }
  },
  methods: {
    handleClick () {
      axios.get('/pdf/create/download', {
        params: {
          cookies: '',
          url: 'https://baidu.com',
          options: {
            path: 'file.pdf'
          }
        },
        responseType: 'arraybuffer'
      }).then((res) => {
        this.downloadFile(res.data)        
      }).catch(error => {
        console.log(error)
      })
    },

    handleClick1 () {
      const defaultOptions = {
        path: 'file.pdf'
      }
      const params = Object.assign({}, defaultOptions, this.form.params || {})
      axios.get('/pdf/create/filename', {
        params: {
          cookie: this.form.cookies,
          url: this.form.url,
          options: {
            ...defaultOptions,
            ...params
          }
        },
        responseType: 'application/json'
      }).then((res) => {
        const element = document.createElement('a')
        element.href = res.data.filename || ''
        element.download = '导出'
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
      }).catch(error => {
        console.log(error)
      })
    },

    multiDownload () {
      const defaultOptions = {
        path: 'file.pdf'
      }
      const params = Object.assign({}, defaultOptions, this.form.params || {})
      axios.post('/pdf/create/files', {
        cookie: this.form1.cookies,
        url: this.form1.urls,
        options: {
          ...defaultOptions,
          ...params
        }
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }).then((res) => {
        this.downloadFile(res.data)
      }).catch(error => {
        console.log(error)
      })
    },

    downloadFile (buff, filename = '导出') {
      const blob = new Blob([buff], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const element = document.createElement('a')
      element.href = url
      element.download = '导出'
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(element)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.content-1 {
  width: 800px;
  margin: 0 auto;
}
</style>
