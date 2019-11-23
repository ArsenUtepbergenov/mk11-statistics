<template>
  <div class="tournament-tree">
    <div ref="tree-nodes" class="flex-cs flex-col tournament-tree__nodes" />
  </div>
</template>

<script>
export default {
  name: 'tournament-tree',
  props: {
    names: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.drawTree()
  },
  methods: {
    drawTree () {
      const treeNodes = this.$refs['tree-nodes']
      const levels = Math.log2(this.names.length)
      if (levels % 1 === 0 && levels > 0) {
        drawNodes(this.names, levels, 1)
      }
      function drawNodes (names, levels, steps) {
        if (levels < 0) {
          return
        }
        if (levels === 0) {
          for (const name of names) {
            drawNode(name, levels)
          }
          return
        } else {
          let i = 0
          while (i < steps) {
            drawNode('', levels, i)
            i++
          }
        }
        levels = levels - 1
        steps *= 2
        return drawNodes(names, levels, steps)
      }
      function drawNode (name, levels, i) {
        const span = document.createElement('span')
        if (name) span.innerText = name
        span.className = 'tournament-tree__node'
        span.style.cssText = `left: ${levels * 20}%; top: ${levels * i * 10}%;`
        treeNodes.appendChild(span)
      }
    }
  }
}
</script>
