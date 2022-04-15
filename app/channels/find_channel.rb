class FindChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'find'
  end

  def inventory_change(data)
    puts data.inspect
  end

  def unsubscribed
    puts 'Hey unsubscribed'
  end
end
