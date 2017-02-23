<template>
  <el-row :gutter="10">
    <el-col :span="5">
      <el-card class="service-history">
        <div v-for="s in serviceHistory" style="width: 100%" @click="selectHistoryItem(s)">
          <el-row>
            <el-col :span="20" class="service-history-item">
              <el-row :gutter="5">
                <el-col :span="16">
                  {{ s.serviceId }}
                </el-col>
                <el-col :span="8">
                  {{ s.serviceExecDate }}
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="4" style="text-align: right;">
              <el-button type="danger" icon="delete" size="mini" @click="deleteHistoryItem(s)"></el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
    <el-col :span="19">
      <el-row :gutter="10">
        <el-col :span="12">
          <div class="panel-block">
            <el-tag type="gray" class="panel-title">输入</el-tag>
            <el-form label-width="80" :rules="rules" ref="inputForm" :model="inputForm">
              <el-form-item label="Service路径" prop="serviceId">
                <el-input placeholder="请输入Service ID" v-model="inputForm.serviceId">
                  <template slot="prepend">{{ targetService }}</template>
                </el-input>
              </el-form-item>
              <el-form-item label="输入数据" prop="input">
                <json-editor mode="code" v-model="inputForm.input" modes="form,code" class="input-json-editor"></json-editor>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="large" @click="callService('inputForm')">执行</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="panel-block">
            <el-tag type="success" class="panel-title">输出</el-tag>
            <json-editor mode="view" class="output-json-editor" modes="view,code" v-model="output"></json-editor>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

</template>
<script>
import util from '../common/util'
import JsonEditor from '../common/components/JSONEditor'

export default {
  data () {
    // var checkInput = function (rule, value, callback) {
    //   value = value || {}
    //   if (Object.keys(value).length === 0) {
    //     callback(new Error('请输入数据'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      rules: {
        serviceId: [
          {
            required: true,
            message: '请输入Service ID',
            trigger: 'blur'
          }
        ]
      },
      inputForm: {
        serviceId: '',
        input: {
        }
      },
      output: {
      },
      serviceHistory: []
    }
  },
  computed: {
    targetService () {
      return util.getConfigValue('TARGET_WEBSERVICE_SERVER')
    }
  },
  methods: {
    callService (formName) {
      // 表单校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateHistory(this.inputForm)
          this.$http.post(this.inputForm.serviceId, this.inputForm.input)
            .then(res => {
              console.log(res)
              this.output = res.data
            })
        } else {
          return false
        }
      })
    },
    updateHistory (serviceObj) {
      let obj = util.cloneDeep(serviceObj)
      obj.serviceExecDate = util.getNow('MM/DD')
      this.serviceHistory.push(obj)
    },
    deleteHistoryItem (item) {
      this.serviceHistory.forEach((v, i) => {
        if (util.isEqual(v, item)) {
          this.serviceHistory.splice(i, 1)
        }
      })
    },
    selectHistoryItem (item) {
      let obj = util.cloneDeep(item)
      this.inputForm = obj
    }
  },
  components: {
    JsonEditor
  }
}
</script>

<style scoped>
  .service-history {
    font-size: 13px;
    overflow-y: auto;
  }
  .service-history-item {
    cursor: pointer;
    margin: 5px 0;
    word-break: break-all;
  }
  .service-history-item:hover {
    background: #e4e8f1;
  }
  .service-history, .panel-block {
    height: 410px;
    padding: 5px;
  }
  .panel-title {
    font-size: 18px;
    font-weight: 700;
    width: 100%;
    text-align: center;
  }
  .panel-block {
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
  }
  .panel-block.hover {
    box-shadow: 0 0 8px 0 rgba(232,237,250,.6),0 2px 4px 0 rgba(232,237,250,.5)
  }
  .h3 {
    font-size: 16px;
  }
  .input-json-editor {
  }
  .output-json-editor {
    margin-top: 10px;
    height: 370px;
  }

</style>
