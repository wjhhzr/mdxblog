---
to: _content/posts/<%=h.month() %>-<%=name %>/index.mdx
---

---
title: <%= name %>
lead: <%= lead %>
date: <%= h.time() %>
tags:
<% tags.forEach(function(t){ -%>
  <%= `- ${t}`%>
<% }); -%>
---