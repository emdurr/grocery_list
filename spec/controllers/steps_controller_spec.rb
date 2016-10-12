require 'rails_helper'

RSpec.describe Api::V1::StepsController, type: :controller do
  login_user

  describe "POST #create" do
    it "succesfully creates a step" do
      step_params = {step: {recipe_id: '34', number: '1', step_text: 'test', user_id: controller.current_user.id}}
      post :create, step_params
      expect(Step.count).to eq(1)
      expect(Step.first.step_text).to eq(step_params[:step][:step_text])
    end

    it "successfully renders JSON" do
      render :json =>{:success => true, :data => data}
      steps_controller.rb
      parse_json = JSON(response.body)
      parse_json['success'].should == true
    end
  end

  describe "DELETE #destroy" do
    it "succesfully deletes a step" do
      step = Step.create(recipe_id: '34', number: '1', step_text: 'test', user_id: controller.current_user.id)
      expect(Step.count).to eq(1)
      delete :destroy, id: step.id
      expect(Step.count).to eq(0)
    end
  end

end
