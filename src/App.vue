<script setup lang="ts">
import { computed, ref } from 'vue'

type PageKey = 'prompts' | 'agents' | 'workflows' | 'chat'

const activePage = ref<PageKey>('prompts')
const selectedPromptId = ref('p1')
const selectedAgentId = ref('a1')
const selectedWorkflowId = ref('w1')
const selectedStepId = ref('s3')
const currentPromptId = ref('p1')
const currentAgentId = ref('a1')

const navs = [
  { key: 'prompts', label: '提示词管理', icon: '▣' },
  { key: 'agents', label: '智能体', icon: '🤖' },
  { key: 'workflows', label: '工作流', icon: '✳' },
  { key: 'chat', label: 'AI问答', icon: '💬' },
] as const

const promptCategories = ['全部提示词', '生产力', '研究分析', '思维整理', '学习成长', '决策判断', '商业创业', '内容创作', '回答增强', '行动计划']
const prompts = [
  { id: 'p1', title: '像高管一样规划你的一天', category: '生产力', tags: ['生产力', '时间管理', '规划'], variables: ['目标', '任务', '会议', '截止日期'], summary: '从目标到时间安排，帮你像高管一样高效规划一天。', content: '你是生产力战略家。我今天的情况：目标：[目标] 任务：[任务] 会议：[会议] 截止日期：[截止日期]。找出我的3大优先事项，围绕它们建立结构化时间表，标记我应该委派或自动化的事项。' },
  { id: 'p2', title: '快速研究任何话题', category: '研究分析', tags: ['研究分析', '信息收集', '学习'], variables: ['话题'], summary: '结构化研究步骤，帮你快速掌握任何新话题。', content: '你是资深研究分析师。话题：[话题]。告诉我最重要的事实、市场走向、关键统计数据、主要参与者，以及真正的机会和风险在哪里。' },
  { id: 'p3', title: '理清混乱的思路', category: '思维整理', tags: ['思维整理', '结构化'], variables: ['想法'], summary: '把混乱想法梳理成清晰结构与可执行方案。', content: '我要分享一些粗糙杂乱的想法。请提取核心观点，整理成逻辑清晰的内容，指出缺失部分，告诉我如何完善它。内容如下：[想法]' },
  { id: 'p4', title: '更快学习任何东西', category: '学习成长', tags: ['学习成长', '高效学习'], variables: ['话题'], summary: '高效学习框架，帮你更快理解并长期记住知识。', content: '以你是该主题最优秀的讲师身份教我[话题]。从最简单的解释开始，涵盖最重要的原理，给我真实例子，警告常见错误，最后给我一个快速回忆的方法。' },
  { id: 'p5', title: '做出更好的决策', category: '决策判断', tags: ['决策判断', '分析评估'], variables: ['情景'], summary: '系统化分析选项，帮你做出更明智的选择。', content: '我需要理清这个决策：[情景]。为我分析优缺点、可能出错的地方、长期前景，以及我未考虑的其他路径。然后告诉我最理性的选择。' },
]
const selectedPrompt = computed(() => prompts.find(p => p.id === selectedPromptId.value) || prompts[0])

const agents = [
  { id: 'a1', name: '生产力教练', icon: '🎯', tag: '生产力', desc: '帮你聚焦目标、优化工作方式，提升每日与每周产出。', promptIds: ['p1'], prompts: ['像高管一样规划你的一天', '优化你的工作方式', '每周绩效回顾', '决定应该做的顺序', '把抽象论分解到今天要做什么'] },
  { id: 'a2', name: '研究分析师', icon: '🔎', tag: '研究分析', desc: '帮你快速研究与分析，提炼要点并形成洞察。', promptIds: ['p2'], prompts: ['快速研究任何话题', '深入了解你的受众', '测试商业创意'] },
  { id: 'a3', name: '思维教练', icon: '🧠', tag: '思维提升', desc: '帮你澄清问题、拓展视角，做出更好的思考。', promptIds: ['p3', 'p5'], prompts: ['理清混乱的思路', '分解难题', '做出更好的决策'] },
  { id: 'a4', name: '学习加速器', icon: '🎓', tag: '学习成长', desc: '帮你高效学习与复盘，掌握知识并快速应用。', promptIds: ['p4'], prompts: ['更快学习任何东西', '找出技能缺口', '激活高级学习模式'] },
  { id: 'a5', name: '内容策略师', icon: '✒️', tag: '内容创作', desc: '帮你打造有策略的内容，吸引目标受众并驱动行动。', promptIds: [], prompts: ['生成内容创意', '写吸引眼球的开场', '写出能转化的文案'] },
  { id: 'a6', name: '商业顾问', icon: '💼', tag: '商业', desc: '帮你解决商业问题，制定方案并评估可行性。', promptIds: [], prompts: ['测试商业创意', '强化你的产品', '深入了解受众'] },
]
const selectedAgent = computed(() => agents.find(a => a.id === selectedAgentId.value) || agents[0])

const workflows = [
  { id: 'w1', name: '深度分析回答流程', desc: '适用于复杂问题的深度分析与结构化回答', tag: '通用', steps: 6 },
  { id: 'w2', name: '研究型问答流程', desc: '适用于研究、调研与资料整合类问题', tag: '研究', steps: 7 },
  { id: 'w3', name: '结构化输出流程', desc: '将信息整理为表格、清单、模板化输出', tag: '输出', steps: 5 },
  { id: 'w4', name: '决策建议流程', desc: '提供多方案对比与决策建议', tag: '决策', steps: 6 },
  { id: 'w5', name: '学习教练流程', desc: '分解知识点并提供学习路径与练习', tag: '学习', steps: 6 },
]
const workflowSteps = [
  { id: 's1', no: '01', name: '理解用户目标', type: '理解', icon: '🎯', desc: '先识别用户真实目标与约束，明确需要解决的核心问题。', input: '用户问题', output: '目标与约束' },
  { id: 's2', no: '02', name: '判断信息是否缺失', type: '判断', icon: '⚖️', desc: '判断关键信息是否充足，如不足则进入澄清环节。', input: '目标与约束', output: '信息完整性判断' },
  { id: 's3', no: '03', name: '提出澄清问题', type: '澄清', icon: '❔', desc: '如信息不足，提出最多 3 个澄清问题，避免过度提问。', input: '信息完整性判断', output: '澄清问题列表' },
  { id: 's4', no: '04', name: '拆解问题并分析', type: '分析', icon: '🧩', desc: '将问题拆解为子问题，进行多角度分析与推理。', input: '用户补充信息', output: '分析结果' },
  { id: 's5', no: '05', name: '生成结构化回答', type: '生成', icon: '📄', desc: '按结论、理由、行动建议输出，使用清晰结构呈现。', input: '分析结果', output: '结构化回答' },
  { id: 's6', no: '06', name: '自检与优化', type: '自检', icon: '🛡️', desc: '检查逻辑、事实与表达，必要时优化并补充。', input: '结构化回答', output: '最终回答' },
]
const selectedStep = computed(() => workflowSteps.find(s => s.id === selectedStepId.value) || workflowSteps[2])

const conversations = ['今日任务安排', '调研一个新行业', '理清一个产品想法', '本周复盘', '写一个转化文案', '优化会议流程']
const chatPrompt = computed(() => prompts.find(p => p.id === currentPromptId.value) || prompts[0])
const chatAgent = computed(() => agents.find(a => a.id === currentAgentId.value) || agents[0])

function usePrompt(id: string) {
  currentPromptId.value = id
  activePage.value = 'chat'
}
function chatWithAgent(id: string) {
  currentAgentId.value = id
  activePage.value = 'chat'
}
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand"><span>AI</span> Workspace</div>
      <button v-for="nav in navs" :key="nav.key" class="nav-item" :class="{ active: activePage === nav.key }" @click="activePage = nav.key">
        <span>{{ nav.icon }}</span>{{ nav.label }}
      </button>
      <div class="sidebar-foot">仅四页 MVP<br />Prompt · Agent · Workflow · Chat</div>
    </aside>

    <main class="main">
      <header class="topbar">
        <input class="global-search" placeholder="搜索提示词、分类或关键词..." />
        <div class="top-icons">☼ 🔔 ? <b>张伟</b></div>
      </header>

      <section v-if="activePage === 'prompts'" class="page">
        <div class="page-head">
          <div><h1>提示词管理</h1><p>轻量整理你的 AI 问答提示词，快速查找、编辑与调用</p></div>
          <div class="actions"><button class="primary">+ 新建提示词</button><button>批量导入</button><button>AI 自动整理</button></div>
        </div>
        <div class="three-col prompts-layout">
          <div class="panel narrow"><h3>分类</h3><button v-for="c in promptCategories" :key="c" class="list-link" :class="{ active: c === '全部提示词' }">{{ c }}</button></div>
          <div class="panel list-panel">
            <article v-for="p in prompts" :key="p.id" class="prompt-card" :class="{ selected: selectedPromptId === p.id }" @click="selectedPromptId = p.id">
              <div class="card-title"><b>{{ p.title }}</b><span>☆</span></div>
              <p>{{ p.summary }}</p>
              <div class="chips"><span v-for="t in p.tags" :key="t">{{ t }}</span></div>
              <small>变量：{{ p.variables.map(v => `[${v}]`).join(' ') }}</small>
              <div class="card-actions"><button>复制</button><button @click.stop="usePrompt(p.id)">填写使用</button><button>编辑</button></div>
            </article>
          </div>
          <div class="panel detail-panel">
            <h2>{{ selectedPrompt.title }}</h2>
            <div class="chips"><span>{{ selectedPrompt.category }}</span><span>时间管理</span></div>
            <p>{{ selectedPrompt.summary }}</p>
            <h3>Prompt 原文</h3>
            <pre>{{ selectedPrompt.content }}</pre>
            <h3>系统识别变量</h3>
            <div class="chips"><span v-for="v in selectedPrompt.variables" :key="v">[{{ v }}]</span></div>
            <div class="big-actions"><button>复制原文</button><button class="primary" @click="usePrompt(selectedPrompt.id)">填写变量后使用</button><button>加入智能体</button></div>
          </div>
        </div>
      </section>

      <section v-if="activePage === 'agents'" class="page">
        <div class="page-head"><div><h1>智能体</h1><p>把常用提示词组合成不同角色，快速进入特定工作模式</p></div><div class="actions"><button class="primary">+ 新建智能体</button><button>从提示词生成</button><button>导入配置</button></div></div>
        <div class="two-col">
          <div class="agent-grid">
            <article v-for="a in agents" :key="a.id" class="agent-card" :class="{ selected: selectedAgentId === a.id }" @click="selectedAgentId = a.id">
              <div class="agent-icon">{{ a.icon }}</div><h2>{{ a.name }}</h2><span class="tag">{{ a.tag }}</span><p>{{ a.desc }}</p>
              <div class="mini-chips"><span v-for="p in a.prompts.slice(0, 3)" :key="p">{{ p }}</span></div>
              <div class="card-actions"><button @click.stop="chatWithAgent(a.id)">立即对话</button><button>编辑</button></div>
            </article>
          </div>
          <div class="panel detail-panel"><h2>{{ selectedAgent.icon }} {{ selectedAgent.name }}</h2><p>{{ selectedAgent.desc }}</p><h3>适用场景</h3><p>日常计划制定、效率优化、目标拆解、研究分析与结构化输出。</p><h3>已绑定提示词</h3><ol class="bound-list"><li v-for="p in selectedAgent.prompts" :key="p">{{ p }} ›</li></ol><h3>开场白 / 回答风格</h3><pre>你好，我是你的{{ selectedAgent.name }}。我会先帮你理清目标，再给出清晰、可执行的建议。</pre><div class="big-actions"><button class="primary">保存</button><button @click="chatWithAgent(selectedAgent.id)">立即对话</button><button>复制配置</button></div></div>
        </div>
      </section>

      <section v-if="activePage === 'workflows'" class="page">
        <div class="page-head"><div><h1>指令工作流</h1><p>像 Skills 一样定义 AI 问答的处理步骤，让回答更稳定、更可复用</p></div><div class="actions"><button class="primary">+ 新建工作流</button><button>从提示词生成</button><button>导入配置</button></div></div>
        <div class="three-col workflows-layout">
          <div class="panel narrow"><h3>工作流库</h3><input placeholder="搜索工作流..." /><article v-for="w in workflows" :key="w.id" class="workflow-row" :class="{ selected: selectedWorkflowId === w.id }" @click="selectedWorkflowId = w.id"><b>{{ w.name }}</b><p>{{ w.desc }}</p><span>{{ w.tag }}</span><span>{{ w.steps }} 步</span></article></div>
          <div class="panel flow-panel"><div class="flow-head"><h2>深度分析回答流程</h2><span class="ok">已启用</span><span>版本 v1.2.0</span><label>自动执行 <input type="checkbox" checked /></label></div><article v-for="s in workflowSteps" :key="s.id" class="step-card" :class="{ selected: selectedStepId === s.id }" @click="selectedStepId = s.id"><div class="step-icon">{{ s.icon }}</div><div><h3>{{ s.no }} {{ s.name }}</h3><p>{{ s.desc }}</p><small>输入：{{ s.input }}　输出：{{ s.output }}</small></div><span>⋯</span></article><button class="add-step">+ 添加步骤</button></div>
          <div class="panel detail-panel"><h2>{{ selectedStep.no }} {{ selectedStep.name }} <span class="tag">{{ selectedStep.type }}</span></h2><h3>步骤指令</h3><pre>关键信息不足时，提出不超过 3 个澄清问题。问题要聚焦关键变量，避免泛泛提问，每个问题应简短明确。</pre><h3>输入变量</h3><div class="chips"><span>用户问题</span><span>目标</span><span>背景</span><span>约束</span></div><h3>输出变量</h3><div class="chips"><span>{{ selectedStep.output }}</span></div><h3>测试与预览</h3><p class="preview">用户输入：我想做一个 AI 副业，但不知道从哪里开始。<br />预览：先识别目标，再判断信息不足，提出 3 个关键澄清问题。</p><div class="big-actions"><button class="primary">保存步骤</button><button>预览结果</button><button>复制指令</button></div></div>
        </div>
      </section>

      <section v-if="activePage === 'chat'" class="page chat-page">
        <div class="chat-layout">
          <div class="panel conversation-panel"><button class="primary full">+ 新建对话</button><input placeholder="搜索对话..." /><button v-for="c in conversations" :key="c" class="list-link">{{ c }}<small>10:24</small></button></div>
          <div class="panel chat-main"><div class="chat-selector"><label>智能体 <select v-model="currentAgentId"><option v-for="a in agents" :key="a.id" :value="a.id">{{ a.name }}</option></select></label><label>提示词 <select v-model="currentPromptId"><option v-for="p in prompts" :key="p.id" :value="p.id">{{ p.title }}</option></select></label></div><div class="msg user"><b>你</b><p>我的目标是完成产品 V2.0 需求评审，推动数据看板上线试点，并准备董事会汇报。</p></div><div class="msg ai"><b>{{ chatAgent.name }}</b><p>根据当前提示词《{{ chatPrompt.title }}》，我会先提炼今日三大优先级，再给出时间安排和可委派事项。</p><table><tr><th>时间</th><th>安排</th><th>目标</th></tr><tr><td>08:30-09:30</td><td>完善评审材料</td><td>确保评审通过</td></tr><tr><td>14:00-15:00</td><td>数据看板对齐</td><td>明确试点方案</td></tr></table></div><div class="chat-input"><input placeholder="输入你的问题，或补充更多背景信息..." /><button>上传内容</button><button>选择提示词</button><button class="primary">发送</button></div></div>
          <div class="panel detail-panel"><h2>推荐提示词</h2><article v-for="p in prompts.slice(0, 4)" :key="p.id" class="recommend" :class="{ selected: p.id === currentPromptId }" @click="currentPromptId = p.id"><b>{{ p.title }}</b><p>{{ p.summary }}</p></article><h3>当前提示词变量</h3><label v-for="v in chatPrompt.variables" :key="v">{{ v }}<input :placeholder="`填写${v}`" /></label><h3>快捷操作</h3><div class="quick-grid"><button>套用提示词</button><button>复制结果</button><button>重新生成</button><button>保存会话</button></div></div>
        </div>
      </section>
    </main>
  </div>
</template>
