" Specify a directory for plugins call plug#begin('~/.vim/plugged')
call plug#begin('~/.vim/plugged')
" inntellisense/language server stuff
Plug 'neoclide/coc.nvim', {'branch': 'release'}
" cool statusline
Plug 'nvim-lualine/lualine.nvim'
Plug 'kyazdani42/nvim-web-devicons'

Plug 'puremourning/vimspector'
Plug 'lewis6991/gitsigns.nvim'

" we all know this guy, fuzzy search
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'junegunn/fzf.vim'
" git client in vim
Plug 'tpope/vim-fugitive'
" ranger intergration
Plug 'francoiscabrol/ranger.vim'
Plug 'rbgrouleff/bclose.vim'
" haskell
Plug 'autozimu/LanguageClient-neovim', {
    \ 'branch': 'next',
    \ 'do': 'bash install.sh'
    \ }


"==============================================
"              SYNTAX HIGHLIGHTING 
"==============================================
"
Plug 'yuezk/vim-js'
Plug 'HerringtonDarkholme/yats.vim' " TS Syntax
Plug 'maxmellon/vim-jsx-pretty' " JSX Syntax
Plug 'numirias/semshi', {'do': ':UpdateRemotePlugins'} "Python syntax
Plug 'sheerun/vim-polyglot' "a bunch of syntax highlighting
Plug 'rrethy/vim-hexokinase', { 'do': 'make hexokinase' } "color highlighting
Plug 'posva/vim-vue'


"==============================================
"               COLOR SCHEMES and THEMING
"==============================================
"
" Plug 'morhetz/gruvbox'
" Plug 'lifepillar/vim-solarized8'
" Plug 'drewtempelmeyer/palenight.vim'
" draculaPlug 'pineapplegiant/spaceduck', { 'branch': 'main' }
"  Plug 'dracula/vim'
"Plug 'sainnhe/everforest'
Plug 'dracula/vim', { 'as': 'dracula' }


" Initialize plugin system
call plug#end()

" Important!!
if has('termguicolors')
  set termguicolors
endif


" must be before setting your colorscheme
augroup nosplit | au!
    autocmd ColorScheme * hi VertSplit ctermfg=NONE ctermbg=NONE 
augroup end

" Set contrast.
hi Normal guibg=NONE ctermbg=NONE
colorscheme dracula


"pretty split
set laststatus=3

"set window title to the working directory
set titlestring+=\ pwd:\ %{substitute(getcwd(),\ $HOME,\ '~',\ '')}
set title



"==============================================
"              VIM SETTINGS 
"==============================================

set wildmode=list:longest,list:full
set showtabline=0

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
"             COC Config 
"==============================================

" coc config
let g:coc_global_extensions = [
  \ 'coc-snippets',
  \ 'coc-tsserver',
  \ 'coc-pyright',
  \ 'coc-eslint', 
  \ 'coc-json', 
  \ ]

let g:coc_filetype_map = {
\ 'js': 'javascriptreact',
\ }


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
"==============================================
"               Vimspector
"==============================================
"
sign define vimspectorBP            text=\ ☠ texthl=WarningMsg
sign define vimspectorBPCond        text=\ ☠ texthl=WarningMsg
sign define vimspectorBPLog         text=\ ☠ texthl=SpellRare
sign define vimspectorBPDisabled    text=\ ● texthl=LineNr
sign define vimspectorPC            text=\=> texthl=MatchParen linehl=CursorLine
sign define vimspectorPCBP          text=☠▶   texthl=MatchParen linehl=CursorLine
sign define vimspectorCurrentThread text=▶   texthl=MatchParen linehl=CursorLine
sign define vimspectorCurrentFrame  text=▶   texthl=Special    linehl=CursorLine

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

nnoremap <leader>p :CocCommand prettier.forceFormatDocument<CR>


" Remap for do diagnotics of current line
nmap <leader>e  :CocDiagnostics <CR>

" open ranger
nmap <leader>x  :Ranger <CR>

" open fugitive
nmap <leader>g  :G <CR>

"vimspector binds
"
nnoremap <Leader>dd :call vimspector#Launch()<CR>
nnoremap <Leader>dr :call vimspector#Reset()<CR>
nnoremap <Leader>dc :call vimspector#Continue()<CR>

nnoremap <Leader>dt :call vimspector#ToggleBreakpoint()<CR>
nnoremap <Leader>dT :call vimspector#ClearBreakpoints()<CR>

nmap <Leader>dh <Plug>VimspectorStepOut
nmap <Leader>dl <Plug>VimspectorStepInto
nmap <Leader>dj <Plug>VimspectorStepOver

nnoremap  <Leader><Leader> gt

"==============================================
"               gitsigns
"==============================================
"

lua << GEND
require('gitsigns').setup {
  on_attach = function(bufnr)
    local gs = package.loaded.gitsigns

    local function map(mode, l, r, opts)
      opts = opts or {}
      opts.buffer = bufnr
      vim.keymap.set(mode, l, r, opts)
    end

    -- Actions
    map({'n', 'v'}, '<leader>hu', ':Gitsigns reset_hunk<CR>')
    map('n', '<leader>hp', gs.preview_hunk)
  end
}
GEND

"==============================================
"               LUA Line
"==============================================
"
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
    lualine_a = {'tabs'},
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

