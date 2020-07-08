  
<template>
<div class="fit">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" :label-position="labelPosition" class="fit-item" >
  <el-form-item label="您的姓名" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="所在地区" prop="region">
   <v-distpicker province="广东省" city="广州市" area="海珠区"></v-distpicker>
  </el-form-item>
  <el-form-item label="您当前居住地址(具体到门牌号)" prop="name">
    <el-input v-model="ruleForm.address"></el-input>
  </el-form-item>
  <el-form-item label="填报时间" required>
    <el-col :span="11">
      <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="date2">
        <el-time-picker placeholder="时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
   <el-form-item label="您当前小区是否有确诊案例" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="是"></el-radio>
      <el-radio label="否"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="您是否被隔离观察" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="是"></el-radio>
      <el-radio label="否"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="您是否确诊" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="是"></el-radio>
      <el-radio label="否"></el-radio>
    </el-radio-group>
  </el-form-item>
  
 
 <el-form-item label="您是否去过湖北" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="是"></el-radio>
      <el-radio label="否"></el-radio>
    </el-radio-group>
  </el-form-item>
    <el-form-item label="如果去过，请选择您去过的城市" prop="type">
    <el-checkbox-group v-model="ruleForm.type">
      <el-checkbox label="武汉市" name="type"></el-checkbox>
      <el-checkbox label="黄石市" name="type"></el-checkbox>
      <el-checkbox label="十堰市" name="type"></el-checkbox>
      <el-checkbox label="宜昌市" name="type"></el-checkbox>
      <el-checkbox label="襄阳市" name="type"></el-checkbox>
      <el-checkbox label="鄂州市" name="type"></el-checkbox>
      <el-checkbox label="荆门市" name="type"></el-checkbox>
      <el-checkbox label="孝感市" name="type"></el-checkbox>
      <el-checkbox label="荆州市" name="type"></el-checkbox>
      <el-checkbox label="黄冈市" name="type"></el-checkbox>
      <el-checkbox label="咸宁市" name="type"></el-checkbox>
      <el-checkbox label="随州市" name="type"></el-checkbox>
      <el-checkbox label="恩施土家族苗族自治州" name="type"></el-checkbox>
      <el-checkbox label="仙桃市" name="type"></el-checkbox>
      <el-checkbox label="潜江市" name="type"></el-checkbox>
      <el-checkbox label="天门市" name="type"></el-checkbox>
      <el-checkbox label="神农架林区" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-from-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-from-item>

 
    
  
</el-form>
</div>
</template>
<script>
import VDistpicker from 'v-distpicker'
  export default {
    components: { VDistpicker },
    data() {
      return {
        labelPosition: 'top',
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          address: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
         
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
.fit{
  margin-top:2rem;
  margin-left:2rem;
  
  
}

</style>