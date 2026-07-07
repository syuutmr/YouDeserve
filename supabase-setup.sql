-- 创建 companies 表
CREATE TABLE companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  company_name TEXT NOT NULL,
  position TEXT DEFAULT '',
  industry TEXT DEFAULT '',
  salary TEXT DEFAULT '',
  level TEXT DEFAULT 'B',
  status TEXT DEFAULT 'not_applied',
  note TEXT DEFAULT '',
  score JSONB DEFAULT '{"salaryScore": null, "growthScore": null, "industryScore": null, "riskScore": null, "totalScore": null}',
  history JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 开启行级安全
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- 用户只能看自己的数据
CREATE POLICY "Users can view own companies"
  ON companies FOR SELECT
  USING (auth.uid() = user_id);

-- 用户只能新增自己的数据
CREATE POLICY "Users can insert own companies"
  ON companies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 用户只能更新自己的数据
CREATE POLICY "Users can update own companies"
  ON companies FOR UPDATE
  USING (auth.uid() = user_id);

-- 用户只能删除自己的数据
CREATE POLICY "Users can delete own companies"
  ON companies FOR DELETE
  USING (auth.uid() = user_id);

-- 自动更新 updated_at 的触发器
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS 
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
 LANGUAGE plpgsql;

CREATE TRIGGER companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
