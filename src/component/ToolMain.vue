<template>
  <ume-row :gutter="10">
    <ume-col :span="5">
      <ume-card class="service-history">
        <div v-for="s in serviceHistory" style="width: 100%" @click="selectHistoryItem(s)">
          <ume-row>
            <ume-col :span="20" class="service-history-item">
              <ume-row :gutter="5">
                <ume-col :span="16">
                  {{ s.serviceId }}
                </ume-col>
                <ume-col :span="8">
                  {{ s.serviceExecDate }}
                </ume-col>
              </ume-row>
            </ume-col>
            <ume-col :span="4" style="text-align: right;">
              <ume-button type="danger" icon="delete" size="mini" @click="deleteHistoryItem(s)"></ume-button>
            </ume-col>
          </ume-row>
        </div>
      </ume-card>
    </ume-col>
    <ume-col :span="19">
      <ume-row :gutter="10">
        <ume-col :span="12">
          <div class="panel-block">
            <ume-tag type="gray" class="panel-title">输入</ume-tag>
            <ume-form label-width="80" :rules="rules" ref="inputForm" :model="inputForm" @submit="callService">
              <ume-form-item label="Service路径" prop="serviceId">
                <ume-input placeholder="请输入Service ID" v-model="inputForm.serviceId">
                  <template slot="prepend">{{ targetService }}</template>
                </ume-input>
              </ume-form-item>
              <ume-form-item label="输入数据" prop="input">
                <json-editor mode="code" v-model="inputForm.input" modes="form,code" class="input-json-editor"></json-editor>
              </ume-form-item>
              <ume-form-item>
                <ume-button type="primary" size="large" native-type="submit">执行</ume-button>
              </ume-form-item>
            </ume-form>
          </div>
        </ume-col>
        <ume-col :span="12">
          <div class="panel-block">
            <ume-tag type="success" class="panel-title">输出</ume-tag>
            <json-editor mode="view" class="output-json-editor" modes="view,code" v-model="output"></json-editor>
          </div>
        </ume-col>
      </ume-row>
    </ume-col>
  </ume-row>

</template>
<script>
import JsonEditor from './JSONEditor'
import Storage, { STORAGE_TYPE } from '../model/Storage'
import Util from '../model/Util'

const STORAGE_KEY = '__service_history_list'

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
      serviceHistory: Storage.getItem(STORAGE_TYPE.LOCAL, STORAGE_KEY) || []
    }
  },
  computed: {
    targetService () {
      return Util.getConfigValue('TARGET_WEBSERVICE_SERVER')
    }
  },
  watch: {
    serviceHistory: {
      deep: true,
      handler (val) {
        console.log(val)
        Storage.setItem(STORAGE_TYPE.LOCAL, STORAGE_KEY, val)
      }
    }
  },
  methods: {
    callService (formName) {
      this.updateHistory(this.inputForm)
      if (this.inputForm.input.params) {
        this.inputForm.input = this.inputForm.input.params
      }
      this.$root.callService(this.inputForm.serviceId, this.inputForm.input)
        .then(res => {
          this.output = res
        })
    },
    updateHistory (serviceObj) {
      let obj = Util.cloneDeep(serviceObj)
      obj.serviceExecDate = Util.getNow('MM/DD')
      this.serviceHistory.push(obj)
    },
    deleteHistoryItem (item) {
      this.serviceHistory.some((v, i) => {
        if (Util.isEqual(v, item)) {
          this.serviceHistory.splice(i, 1)
          return true
        }
      })
    },
    selectHistoryItem (item) {
      let obj = Util.cloneDeep(item)
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
