import re

path = 'src/modules/planning/executive/csuiteData.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add CBO to CSuiteRole
if "'CBO'" not in content:
    content = content.replace("| 'CSO';", "| 'CSO'\n  | 'CBO';")
    content = content.replace("  CSO: {", "  CBO: {\n    title: 'Chief Business Officer',\n    category: 'Business Strategy',\n    description: 'Business model feasibility, market partnerships, and cross-functional operations.'\n  },\n  CSO: {")
    content = content.replace("'CCO', 'CSO'", "'CCO', 'CSO', 'CBO'")

# 2. Add CBO dummy data to INITIAL_CSUITE_DATA phases so it doesn't break
# We will inject a CBO object after CEO in each phase.
cbo_template = """    {
      role: 'CBO',
      title: 'Chief Business Officer',
      score: 85,
      status: 'Pending',
      reviewed: 'Business strategy and market alignment.',
      findings: 'Requires further alignment on business partnerships.',
      criteria: ['Business Model', 'Partnerships', 'Market Fit'],
      risk: 'Medium'
    },
"""

def inject_cbo(match):
    return match.group(0) + "\n" + cbo_template

content = re.sub(r"role:\s*'CEO'[\s\S]*?risk:\s*'[^']*'\s*\},", inject_cbo, content)

# 3. Filter roles
needed = {
    'idea': ['CEO', 'CPO', 'CTO', 'CBO'],
    'opportunity': ['CBO', 'CMO', 'CSO', 'CFO'],
    'problem': ['CPO', 'CBO'],
    'solution': ['CPO', 'CTO', 'CDO', 'CISO'],
    'business_model': ['CBO', 'CSO', 'CFO', 'CMO'],
    'product_definition': ['CPO', 'CTO', 'CDO', 'CISO'],
    'requirements': ['CPO', 'CBO', 'CTO', 'CDO', 'CISO'],
    'documentation': ['CEO', 'CTO', 'CIO']
}

# We need to parse each phase block and filter the objects.
# We'll split the content into before INITIAL_CSUITE_DATA and after.
match = re.search(r'export const INITIAL_CSUITE_DATA: Record<DiscoveryPage, CSuiteMemberReview\[\]> = \{', content)
if match:
    start_idx = match.end()
    
    # Simple state machine to parse phases and roles
    output = content[:start_idx]
    
    rest = content[start_idx:]
    
    for phase, roles in needed.items():
        # find phase start
        phase_start = re.search(r'\s*' + phase + r':\s*\[', rest)
        if not phase_start:
            continue
            
        output += rest[:phase_start.end()]
        rest = rest[phase_start.end():]
        
        # Now read objects inside this array
        # An object is between { and },
        # We will extract each object, check its role, and keep it if needed.
        
        kept_objects = []
        while True:
            # find next {
            obj_start = rest.find('{')
            end_array = rest.find(']')
            
            if end_array < obj_start or obj_start == -1:
                # Array ended
                break
                
            # match object
            obj_end = rest.find('}', obj_start) + 1
            # Wait, criteria has [], so there's no nested {} inside our objects.
            obj_str = rest[obj_start:obj_end]
            
            # Check role
            role_match = re.search(r"role:\s*'([^']+)'", obj_str)
            if role_match:
                role = role_match.group(1)
                if role in roles:
                    kept_objects.append(obj_str)
            
            rest = rest[obj_end:]
            
            # consume comma if there is one
            comma_match = re.match(r'\s*,', rest)
            if comma_match:
                rest = rest[comma_match.end():]
                
        # Join kept objects
        output += '\n    ' + ',\n    '.join(kept_objects) + '\n  '
        
        # Add the closing bracket
        close_array = rest.find(']')
        output += rest[:close_array+1]
        rest = rest[close_array+1:]
        
    output += rest
    content = output

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
