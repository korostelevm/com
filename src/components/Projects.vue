<template>
  <div>
    <h3>Projects</h3>
    <div class="text-sm text-gray-600 mb-4">Few of the bigger things I've been building</div>
    <div>
      <a
          href="https://cyclic.sh/"
          target="_blank"
          class="font-bold hover:underline "
        >
          cyclic.sh
        </a>
    </div>
      <div>
      <a
          href="https://www.blackknightinc.com/blog/seller-digital-platform-uses-ai-and-decisioning-to-help-correspondent-lenders-easily-originate-and-sell-loans/"
          target="_blank"
          class=" font-bold hover:underline"
        >
          SellerDigital
        </a>
      </div>
      <div>
      <a
          href="https://pdaps.org/"
          target="_blank"
          class=" font-bold hover:underline"
        >
          PDAPS
        </a>
      </div>

    </div>
</template>

<script>
export default {
  name: 'Projects',
  props: {
    msg: String
  },
  data(){
    return{
    }
  },
  async mounted() {   
    },
  methods:{
    
  }
}
</script>

