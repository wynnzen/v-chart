<template>
  <a-modal
    title="查看配置"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
	<Editor v-model="formattedCode" :opts="opts" />
  </a-modal>
</template>
<script>
import Editor from "@/components/Editor/CodeMirrorEditor";
export default {
	components:{Editor},
	props:{
		code:{
			type:Object,
			default:{}
		}
	},
	computed:{
		formattedCode(){
			 return  JSON.stringify(this.code, null, 2);
		}
	},
  data() {
    return {
      visible: false,
			opts:{}
    };
  },
  methods: {
    handleOk() {
      this.changeVisible()
    },
    handleCancel() {
      this.changeVisible()
    },
		changeVisible(){
			this.visible = !this.visible
		}
  },
};
</script>

</script>
