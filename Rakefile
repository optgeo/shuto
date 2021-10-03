require './constants'

desc 'host the site locally'
task :host do
  sh "budo -d docs"
end

desc 'generate style.json'
task :style do
  sh "curl -o #{BASE_STYLE_PATH} #{BASE_STYLE_URL}" unless File.exist?(BASE_STYLE_PATH)
  sh "ruby style.rb"
end

