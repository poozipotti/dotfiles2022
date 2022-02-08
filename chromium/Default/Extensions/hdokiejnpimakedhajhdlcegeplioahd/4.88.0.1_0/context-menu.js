LPContextMenus=function(){var u=null,c=null,a=[],i=[],s=[],d=[],p="all",t=!1,m=20;function f(e,t){var n=gettabid(t),o=gettaburl(t),c=i[e.menuItemId];sendLpImprove("sitelogin",{shareType:getShareType(c),copy:0,autologin:0,source:"context"},!0),LegacyFillTracking.track("Password","Context Menu"),handleFill(n,{url:o,topurl:o,docid:0,force:!1,docnum:0,cmd:"autofillaid",aid:c,source:"notrack"})}function g(e,t){var n=i[e.menuItemId];copyusername(n),sendLpImprove("copyitem",{itemtype:"username",source:"context"})}function h(e,t){var n=i[e.menuItemId];copypassword(n),sendLpImprove("sitelogin",{shareType:getShareType(n),copy:1,autologin:0,source:"context"},!0),sendLpImprove("copypass",{action:"sitepassword",source:"context"})}function x(e,t){var n=i[e.menuItemId];copyurl(n)}function I(e,t){var n=i[e.menuItemId],o=s[e.menuItemId],c=d[e.menuItemId];copyprop(n,o,0,-1,null,c),sendLpImprove("copyitem",{itemtype:o,source:"context"})}function y(e,t){var n=i[e.menuItemId],o=g_securenotes[n];LegacyFillTracking.track(o.notetype,"Context Menu"),fillitem(n,null,null,0,null,"context")}function r(e,t){var n=i[e.menuItemId];fillform(n,null,null,null,null,null,"context")}function l(e,t){var n=i[e.menuItemId];editprofile(n,null,"context")}function v(e,t){var n=i[e.menuItemId];openeditsite(n),sendLpImprove("edititem",{itemtype:"Saved Site",source:"context"})}function C(e,t){var n=i[e.menuItemId],o=s[e.menuItemId];openeditsecurenote(n),sendLpImprove("edititem",{itemtype:o,source:"context"})}function M(e,t){for(var n=0===t?f:1==t?g:2==t?h:x,o=e.slice(0,m).sort(function(e,t){return e.name&&t.name?e.name.localeCompare(t.name):0}),c=0;c<o.length;c++){var r=e[c].useusername;r=void 0!==r&&r.length?" ("+r+")":"";var l=chrome.contextMenus.create({title:e[c].name+r,contexts:[p],parentId:a[t],onclick:n});i[l]=e[c].aid,a[a.length]=l}e.length>m&&(a[a.length]=chrome.contextMenus.create({type:"separator",contexts:[p],parentId:a[t]}),a[a.length]=chrome.contextMenus.create({title:gs("Additional sites available in the Vault"),contexts:[p],parentId:a[t],onclick:openvault}))}function k(e){if(void 0===g_prefoverrides.show_formfills||"1"===g_prefoverrides.show_formfills){for(var t=e?6:3,n=0,o=0;o<g_formfills.length;o++)if(check_ident_ffid(g_formfills[o].ffid)){a[a.length]=chrome.contextMenus.create({title:g_formfills[o].decprofilename,contexts:[p],parentId:a[t]});var c=chrome.contextMenus.create({title:gs("Fill Form"),contexts:[p],parentId:a[a.length-1],onclick:r});i[c]=g_formfills[o].ffid;var c=chrome.contextMenus.create({title:gs("Edit"),contexts:[p],parentId:a[a.length-1],onclick:l});if(i[c]=g_formfills[o].ffid,m<=(n+=1))break}a[a.length]=chrome.contextMenus.create({type:"separator",contexts:[p],parentId:a[t]}),a[a.length]=chrome.contextMenus.create({title:gs("Add Profile"),contexts:[p],parentId:a[t],onclick:function(){addprofile(null,"context")}}),a[a.length]=chrome.contextMenus.create({title:gs("Add Credit Card"),contexts:[p],parentId:a[t],onclick:function(){addcreditcard(null,"context")}}),a[a.length]=chrome.contextMenus.create({title:gs("Clear Forms"),contexts:[p],parentId:a[t],onclick:function(){clearforms("context")}}),a[a.length]=chrome.contextMenus.create({title:gs("Choose Profile and Credit Card"),contexts:[p],parentId:a[t],onclick:function(){openchooseprofilecc("context")}}),m<n&&(a[a.length]=chrome.contextMenus.create({type:"separator",contexts:[p],parentId:a[t]}),a[a.length]=chrome.contextMenus.create({title:gs("Additional form fills available in the Vault"),contexts:[p],parentId:t,onclick:openvault}))}}function _(e,t){if(lploggedin){a[a.length]=chrome.contextMenus.create({title:gs("Auto Fill"),contexts:[p],parentId:u}),t&&(a[a.length]=chrome.contextMenus.create({title:gs("Copy Username"),contexts:[p],parentId:u}),a[a.length]=chrome.contextMenus.create({title:gs("Copy Password"),contexts:[p],parentId:u}),a[a.length]=chrome.contextMenus.create({title:gs("Copy URL"),contexts:[p],parentId:u})),a[a.length]=chrome.contextMenus.create({title:gs("Recheck Page"),contexts:[p],parentId:u,onclick:function(e,t){recheckpage()}}),a[a.length]=chrome.contextMenus.create({title:gs("Generate Secure Password"),contexts:[p],parentId:u,onclick:opengenpw}),void 0!==g_prefoverrides.show_formfills&&"1"!==g_prefoverrides.show_formfills||(a[a.length]=chrome.contextMenus.create({title:gs("Fill Forms"),contexts:[p],parentId:u}));for(var n=t?3:0,o=0;o<=n;o++)0<e.length?M(e,o):chrome.contextMenus.create({title:gs("No Matching Sites!"),contexts:[p],parentId:a[o]});k(t)}}function b(e,t,n){return a[a.length]=chrome.contextMenus.create({title:gs(e),contexts:[p],parentId:n||u,onclick:t})}function w(e,t,n,o,c,r){var l=chrome.contextMenus.create({title:gs(t),contexts:[p],parentId:a[a.length-1],onclick:c});null!=l&&(i[l]=e,null!=n&&(s[l]=n,d[l]=o))}function P(e,n,t){var o=e.length<m?e.length:m;e.slice(0,o).forEach(function(e){var t=e.useusername?" - "+e.useusername:"";b(e.name+t),w(e.aid,"Fill",null,null,f),w(e.aid,"Edit",null,null,v),n&&(w(e.aid,"Copy username","Username",null,g),w(e.aid,"Copy password","Password",null,h))}),chrome.contextMenus.create({type:"separator",contexts:[p],parentId:u});for(var c=b("Other"),r=Object.keys(g_securenotes),l=[],a=0;a<r.length&&l.length<m;a++)check_ident_aid(g_securenotes[r[a]].aid)&&-1<fillableNoteTypes.indexOf(g_securenotes[r[a]].notetype)&&l.push(addUserFriendlyDescription(g_securenotes[r[a]]));l.sort(function(e,t){return e.name&&t.name?e.name.localeCompare(t.name):0});for(var i=l.length<m?l.length:m,a=0;a<i;a++){var s=l[a];if(b(s.description?s.decprofilename+"  -  "+s.description:s.decprofilename,null,c),w(s.aid,"Fill",null,null,y),w(s.aid,"Edit",s.notetype,null,C),n)switch(s.notetype){case"Credit Card":w(s.aid,"Copy card number","Number",null,I),w(s.aid,"Copy CVV/Security code","Security Code",null,I);break;case"Bank Account":w(s.aid,"Copy account number","Account Number",null,I),w(s.aid,"Copy routing number","Routing Number",null,I);break;case"Address":w(s.aid,"Copy first name","First Name",null,I),w(s.aid,"Copy last name","Last Name",null,I),w(s.aid,"Copy address 1","Address 1",null,I),w(s.aid,"Copy city/town","City / Town",null,I),w(s.aid,"Copy zip/postal code","Zip / Postal Code",null,I),w(s.aid,"Copy email address","Email Address",null,I),w(s.aid,"Copy phone number","Phone","num",I)}}chrome.contextMenus.create({type:"separator",contexts:[p],parentId:u}),(m<o||m<i)&&chrome.contextMenus.create({title:gs("Additional items available in the Vault"),contexts:[p],parentId:u,onclick:openvault}),b("Add Item",function(){openaddsecurenote()}),b("Recheck Page",function(e,t){recheckpage()}),b("Generate Secure Password",opengenpw)}function L(e,t){if(setcurrenturl(e),"undefined"!=typeof chrome&&void 0!==chrome.contextMenus&&1!=lpGetPref("hideContextMenus",0)&&c!=e)if(c=e,a.length)F(function(){c=null,L(e,t)});else if(i=[],lploggedin){var n=reorderOnURL(getsites(e),e,!0,!1),o=can_copy_to_clipboard()&&!g_isedge;LPContentScriptFeatures.omaria?P(n,o,t):_(n,o)}}function F(e){lpdbg("context","createContextMenus called"),"undefined"==typeof chrome||void 0===chrome.contextMenus||t&&1!=lpGetPref("hideContextMenus",0)&&!e||(lpdbg("context","not created yet or preference changed"),chrome.contextMenus.removeAll(function(){lpdbg("context","context menu items all removed"),t=!1,a=[],0==lpGetPref("hideContextMenus",0)&&(lpdbg("context","creating context menu"),e=e||n,u=chrome.contextMenus.create({title:gs("LastPass"),contexts:["all"],onclick:o},e))}))}function n(){console_log("Context menu callback function called"),t=!0}function o(e,t){lploggedin||open_login()}function e(e){return function(){if(!LPContentScriptFeatures.web_client_fill)return e.apply(this,arguments)}}return e(F)(),{rebuildcontext:e(L),createContextMenus:e(F),lastcontexturl:c}}();