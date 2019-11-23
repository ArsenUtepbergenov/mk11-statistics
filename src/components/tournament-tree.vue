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
      let currentFirstNode = 50
      let currentTopIndent = currentFirstNode
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
          for (let [index, name] of names.entries()) {
            createNode(name, levels, index)
          }
        } else {
          let i = 0
          while (i < steps) {
            createNode('', levels, i)
            i++
          }
        }
        levels = levels - 1
        currentFirstNode = currentFirstNode / 2
        currentTopIndent = currentFirstNode
        steps *= 2
        return drawNodes(names, levels, steps)
      }
      function createNode (name, levels, i) {
        const span = document.createElement('span')
        if (name) span.innerText = name
        span.className = 'tournament-tree__node'
        currentTopIndent += currentFirstNode * 2
        span.setAttribute('key', levels / 2)
        if (i === 0) currentTopIndent = currentFirstNode
        span.style.cssText = `left: ${levels * 20}%; top: ${currentTopIndent}%;`
        treeNodes.appendChild(span)
      }
    }
  }
}
</script>
