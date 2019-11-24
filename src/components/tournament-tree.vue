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
      const context = this
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
        span.setAttribute('key', Math.ceil((i + 1) / 2))
        span.setAttribute('level', levels)
        if (i === 0) currentTopIndent = currentFirstNode
        span.style.cssText = `left: ${levels * 20}%; top: ${currentTopIndent}%;`
        span.addEventListener('click', context.changeLevel)
        treeNodes.appendChild(span)
      }
    },
    changeLevel (event) {
      const target = event.currentTarget
      if (target) {
        const text = target.innerText
        if (!text) return
        const level = target.getAttribute('level')
        const key = target.getAttribute('key')
        const treeNodes = this.$refs['tree-nodes']
        const allNodes = treeNodes.querySelectorAll('.tournament-tree__node')
        const subNodes = []
        allNodes.forEach(node => {
          const nextLevel = parseInt(level) + 1
          if (parseInt(node.getAttribute('level')) === nextLevel) {
            subNodes.push(node)
          }
        })
        if (subNodes && subNodes.length > 0) {
          if (subNodes[key - 1].innerText) return
          subNodes[key - 1].innerText = text
          target.className += ' tournament-tree--selected'
          target.removeEventListener('click', this.changeLevel)
        }
      }
    }
  }
}
</script>
