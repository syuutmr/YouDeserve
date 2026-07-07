import { useState } from 'react'
import { LEVELS } from '../../utils/constants'

export default function AddCompanyModal({ onClose, onSave, editCompany = null }) {
  const isEdit = editCompany !== null
  const [form, setForm] = useState({
    companyName: editCompany?.company_name || editCompany?.companyName || '',
    position: editCompany?.position || '',
    industry: editCompany?.industry || '',
    salary: editCompany?.salary || '',
    level: editCompany?.level || 'B',
    note: editCompany?.note || '',
  })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.companyName.trim()) {
      setError('请填写公司名称')
      return
    }
    const data = {
      ...form,
      companyName: form.companyName.trim(),
    }
    if (isEdit) data.id = editCompany.id
    onSave(data)
  }

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/15 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl w-full max-w-lg p-8 animate-fade-in max-h-[90vh] overflow-y-auto border border-white/60">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary">
            {isEdit ? '编辑公司' : '添加公司'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-300 hover:text-gray-500 hover:bg-white/60 transition-all"
          >
            ?
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              公司名称 <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              placeholder="输入公司名称"
              value={form.companyName}
              onChange={(e) => updateField('companyName', e.target.value)}
              className="w-full px-4 py-2.5 bg-white/50 border border-white/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 transition-all placeholder:text-gray-300 backdrop-blur-sm"
              autoFocus
            />
            {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">岗位名称</label>
            <input
              type="text"
              placeholder="前端工程师"
              value={form.position}
              onChange={(e) => updateField('position', e.target.value)}
              className="w-full px-4 py-2.5 bg-white/50 border border-white/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all placeholder:text-gray-300 backdrop-blur-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">行业</label>
              <input
                type="text"
                placeholder="互联网 / SaaS"
                value={form.industry}
                onChange={(e) => updateField('industry', e.target.value)}
                className="w-full px-4 py-2.5 bg-white/50 border border-white/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all placeholder:text-gray-300 backdrop-blur-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">薪资范围</label>
              <input
                type="text"
                placeholder="20k-30k"
                value={form.salary}
                onChange={(e) => updateField('salary', e.target.value)}
                className="w-full px-4 py-2.5 bg-white/50 border border-white/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all placeholder:text-gray-300 backdrop-blur-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">评级</label>
            <div className="flex gap-2">
              {Object.entries(LEVELS).map(([key, info]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => updateField('level', key)}
                  className={lex-1 p-3 rounded-xl border-2 text-center transition-all backdrop-blur-sm }
                >
                  <span className="block text-lg font-bold">{info.label}</span>
                  <span className="block text-xs mt-0.5 leading-tight opacity-70">{info.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">备注</label>
            <textarea
              placeholder="任何想记录的信息..."
              value={form.note}
              onChange={(e) => updateField('note', e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 bg-white/50 border border-white/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all placeholder:text-gray-300 backdrop-blur-sm resize-none"
            />
          </div>

          <button type="submit" className="w-full btn-primary py-3 mt-2">
            {isEdit ? '保存修改' : '保存公司'}
          </button>
        </form>
      </div>
    </div>
  )
}
