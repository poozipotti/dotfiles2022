" Specify a directory for plugins
call plug#begin('~/.vim/plugged')

" inntellisense/language server stuff
Plug 'neoclide/coc.nvim', {'branch': 'release'}
" cool statusline
Plug 'nvim-lualine/lualine.nvim'
Plug 'kyazdani42/nvim-web-devicons'

Plug 'puremourning/vimspector'
" nice formatter
Plug 'sbdchd/neoformat' " really nice git stuff on the side
Plug 'airblade/vim-gitgutter'

" we all know this guy, fuzzy search
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'junegunn/fzf.vim'
" git client in vim
Plug 'tpope/vim-fugitive'
" prettier integration
Plug 'prettier/vim-prettier', { 'do': 'yarn install' }
" ranger intergration
Plug 'francoiscabrol/ranger.vim'
Plug 'rbgrouleff/bclose.vim'
" haskell
Plug 'autozimu/LanguageClient-neovim', {
    \ 'branch': 'next',
    \ 'do': 'bash install.sh'
    \ }
" tidal cycles 
Plug 'tidalcycles/vim-tidal'
Plug 'davidgranstrom/scnvim', { 'do': {-> scnvim#install() } }





"==============================================
"               COLOR SCHEMES
"==============================================
"
" Plug 'morhetz/gruvbox'
" Plug 'lifepillar/vim-solarized8'
" Plug 'drewtempelmeyer/palenight.vim'
" draculaPlug 'pineapplegiant/spaceduck', { 'branch': 'main' }
"  Plug 'dracula/vim'
Plug 'sainnhe/everforest'
Plug 'sheerun/vim-polyglot'






"==============================================
"              SYNTAX HIGHLIGHTING 
"==============================================
"
Plug 'yuezk/vim-js'
Plug 'HerringtonDarkholme/yats.vim' " TS Syntax
Plug 'maxmellon/vim-jsx-pretty' " JSX Syntax
Plug 'numirias/semshi', {'do': ':UpdateRemotePlugins'} "Python syntax


" Initialize plugin system
call plug#end()


"==============================================
"              VIM SETTINGS 
"==============================================

set wildmode=list:longest,list:full

set relativenumber
set number

set nowrap
set smarttab
set cindent
set tabstop=2
set shiftwidth=2

set hlsearch
set incsearch
" always uses spaces instead of tab characters
set expandtab
set clipboard=unnamedplus

" set termguicolors
" clear background
"set background=light
"let g:vim_jsx_pretty_colorful_config = 1 " default 0
"hi NormalFloat ctermfg=13 ctermbg=4
"
" Important!!
if has('termguicolors')
  set termguicolors
endif

set background=light
" Set contrast.
" This configuration option should be placed before `colorscheme everforest`.
" Available values: 'hard', 'medium'(default), 'soft'
let g:everforest_background = 'soft'
" For better performance
let g:everforest_better_performance = 1
colorscheme everforest

"pretty split
set fillchars+=vert:│
hi VertSplit ctermbg=NONE guibg=NONE
set laststatus=3

"==============================================
"              FZF CONFIG / POPUP
"==============================================
set wildignore+=*.o,*.obj,.git,*.rbc,*.pyc,__pycache__
let $FZF_DEFAULT_COMMAND='fd --type f'
let $FZF_DEFAULT_OPTS=' --color=light --color=fg:-1,hl:6,fg+:#ffffff,bg+:0,hl+:14 --color=info:0,prompt:0,pointer:12,marker:4,spinner:11,header:-1 --layout=reverse  --margin=0,0'
let g:fzf_layout = { 'window': 'call FloatingFZF()' }
 
function! FloatingFZF()
  let buf = nvim_create_buf(v:false, v:true)
  call setbufvar(buf, '&signcolumn', 'no')
 
  let height = float2nr(50)
  let width = float2nr(160)
  let horizontal = float2nr((&columns - width) / 2)
  let vertical = 1
 
  let opts = {
        \ 'relative': 'editor',
        \ 'row': vertical,
        \ 'col': horizontal,
        \ 'width': width,
        \ 'height': height,
        \ 'style': 'minimal',
        \ 'border': 'double',
        \ }
   
  call nvim_open_win(buf, v:true, opts)
endfunction

function! RipgrepFzf(query, fullscreen)
  let command_fmt = 'rg --column --line-number --no-heading --color=always --smart-case %s || true | fd --type f'
  let initial_command = printf(command_fmt, shellescape(a:query))
  let reload_command = printf(command_fmt, '{q}')
  let spec = {'options': ['--phony', '--query', a:query, '--bind', 'change:reload:'.reload_command]}
  call fzf#vim#grep(initial_command, 1,fzf#vim#with_preview(), a:fullscreen)
endfunction

command! -nargs=* -bang RG call RipgrepFzf(<q-args>,<bang>0)
"==============================================
"             Ranger  CONFIG 
"==============================================
"
let g:ranger_map_keys = 0

"==============================================
"             VIM PRETTIER 
"==============================================
"let g:prettier#quickfix_enabled = 0
"let g:prettier#quickfix_auto_focus = 0
" prettier command for coc
" command! -nargs=0 Prettier :CocCommand prettier.formatFile
" run prettier on save
"let g:prettier#autoformat = 0
"autocmd BufWritePre *.js,*.jsx,*.mjs,*.ts,*.tsx,*.css,*.less,*.scss,*.json,*.graphql,*.md,*.vue,*.yaml,*.html PrettierAsync




"==============================================
"             COC Config 
"==============================================

" coc config
let g:coc_global_extensions = [
  \ 'coc-snippets',
  \ 'coc-tsserver',
  \ 'coc-pyright',
  \ 'coc-eslint', 
  \ 'coc-prettier', 
  \ 'coc-json', 
  \ ]

let g:coc_filetype_map = {
\ 'js': 'javascriptreact',
\ }

"haskell config
set rtp+=~/.vim/pack/XXX/start/LanguageClient-neovim
let g:LanguageClient_serverCommands = { 'haskell': ['haskell-language-server-wrapper', '--lsp'] }
" more haskell config might mess up other stuff
hi link ALEError Error
hi Warning term=underline cterm=underline ctermfg=Yellow gui=undercurl guisp=Gold
hi link ALEWarning Warning
hi link ALEInfo SpellCap

" from readme
" if hidden is not set, TextEdit might fail.
set hidden " Some servers have issues with backup files, see #649 set nobackup set nowritebackup " Better display for messages set cmdheight=2 " You will have bad experience for diagnostic messages when it's default 4000.
set updatetime=300

" don't give |ins-completion-menu| messages.
set shortmess+=c

" always show signcolumns
set signcolumn=yes



function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~# '\s'
endfunction



function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  else
    call CocAction('doHover')
  endif
endfunction



augroup mygroup
  autocmd!
  " Setup formatexpr specified filetype(s).
  autocmd FileType typescript,json setl formatexpr=CocAction('formatSelected')
  " Update signature help on jump placeholder
  autocmd User CocJumpPlaceholder call CocActionAsync('showSignatureHelp')
augroup end


" Use `:Fold` to fold current buffer
command! -nargs=? Fold :call     CocAction('fold', <f-args>)

" Add status line support, for integration with other plugin, checkout `:h coc-status`
set statusline^=%{coc#status()}%{get(b:,'coc_current_function','')}


"==============================================
"               TIDAL
"==============================================
" use neovim's own terminal instead of tmux:
let g:tidal_target = "terminal"


"==============================================
"               cool splitting
"==============================================
" split automatically if window doesn't exist
function! WinMove(key)
  let t:curwin = winnr()
  exec "wincmd ".a:key
  if (t:curwin == winnr()) "we haven't moved
    if (match(a:key,'[jk]')+1) "we want to go up/down
      wincmd s
    elseif (match(a:key,'[hl]')+1) "we want to go left/right
      wincmd v
    endif
    exec "wincmd ".a:key
  endif
endfunction
"

"==============================================
"               KEYMAPS
"==============================================
let mapleader="\<Space>"

""remap our split keys
map <C-h> :call WinMove('h')<cr>
map <C-k> :call WinMove('k')<cr>
map <C-l> :call WinMove('l')<cr>
map <C-j> :call WinMove('j')<cr>

" lets u escape terminal mode
" tnoremap <Esc> <C-\><C-n>
nnoremap <silent> <C-f> :call RipgrepFzf("",0)<CR>

nnoremap <silent> <C-p> :call fzf#vim#files('.', {'options': '--prompt ""'})<CR>
nnoremap <silent> <C-f> :call RipgrepFzf("",0)<CR>

inoremap jk <ESC>

" Use <cr> to confirm completion, `<C-g>u` means break undo chain at current position.
" Coc only does snippet and additional edit on confirm.
  inoremap <silent><expr> <CR> coc#pum#visible() ? coc#pum#confirm() : "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>"
" Or use `complete_info` if your vim support it, like:
" inoremap <expr> <cr> complete_info()["selected"] != "-1" ? "\<C-y>" : "\<C-g>u\<CR>"

" Use tab for trigger completion with characters ahead and navigate.
" Use command ':verbose imap <tab>' to make sure tab is not mapped by other plugin.
"
" Use <c-space> to trigger completion.
inoremap <silent><expr> <c-space> coc#refresh()


" Remap for do diagnotics of current line
nmap <leader>e  :CocDiagnostics <CR>

" open ranger
nmap <leader>x  :Ranger <CR>

" open fugitive
nmap <leader>g  :G <CR>

"vimspector binds
nnoremap <Leader>dd :call vimspector#Launch()<CR>
nnoremap <Leader>dr :call vimspector#Reset()<CR>
nnoremap <Leader>dc :call vimspector#Continue()<CR>


nnoremap <Leader>dt :call vimspector#ToggleBreakpoint()<CR>
nnoremap <Leader>dT :call vimspector#ClearBreakpoints()<CR>

nmap <Leader>dh <Plug>VimspectorStepOut
nmap <Leader>dl <Plug>VimspectorStepInto
nmap <Leader>dj <Plug>VimspectorStepOver

"==============================================
"               LUA Line
"==============================================
lua << END
require('lualine').setup {
  options = {
    icons_enabled = true,
    theme = 'auto',
    component_separators = { left = '|', right = '|'},
    section_separators = { left = '', right = ''},
    disabled_filetypes = {
      statusline = {},
      winbar = {},
    },
    ignore_focus = {},
    always_divide_middle = true,
    globalstatus = true,
    refresh = {
      statusline = 1000,
      tabline = 1000,
      winbar = 1000,
    }
  },
  sections = {
    lualine_a = {},
    lualine_b = {'branch','diff'},
    lualine_c = {'filename'},
    lualine_x = {},
    lualine_y = {},
    lualine_z = {'location'}
  },
  inactive_sections = {
    lualine_a = {},
    lualine_b = {},
    lualine_c = {},
    lualine_x = {'location'},
    lualine_y = {},
    lualine_z = {}
  },
  tabline = {},
  winbar = {},
  inactive_winbar = {},
  extensions = {}
}
END
