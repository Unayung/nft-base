class Request < ApplicationRecord
  has_one_attached :file
  after_create_commit :mint

  def mint
    key = Eth::Key.new(priv: '這邊填錢包的私鑰')
    client = Ethereum::HttpClient.new('這邊填鏈 api 的 endpoint')
    contract = Ethereum::Contract.create(
      file: './contracts/ASSETS.sol',
      # address: '0x6c87e00b368bedee0defa0a8d2702702294bc317',
      client: client
    )
    contract.key = key
    contract.transact_and_wait.mint(mint_to_address)
    update(minted: true)
  end
end
